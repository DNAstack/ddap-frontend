/*
 * Copyright 2013-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.dnastack.ddap.common.proxy;

import com.dnastack.ddap.common.util.TimeoutUtil;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.reactivestreams.Publisher;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.cloud.gateway.support.TimeoutException;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatus.Series;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.retry.Repeat;
import reactor.retry.RepeatContext;
import reactor.retry.Retry;
import reactor.retry.RetryContext;

import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

/**
 * Copied and slightly modified from RetryGatewayFilterFactory in spring-cloud-gateway-core:2.1.0.RC2
 *
 * Changes from the original are called out in comments with 'CHANGED'.
 */
@Slf4j
@Component
public class TimeoutAndRetryGatewayFilterFactory extends AbstractGatewayFilterFactory<TimeoutAndRetryGatewayFilterFactory.RetryConfig> {

	public static final String RETRY_ITERATION_KEY = "retry_iteration";

	public TimeoutAndRetryGatewayFilterFactory() {
		super(RetryConfig.class);
	}

	@Override
	public GatewayFilter apply(RetryConfig retryConfig) {
		retryConfig.validate();

		Repeat<ServerWebExchange> statusCodeRepeat = null;
		if (!retryConfig.getStatuses().isEmpty() || !retryConfig.getSeries().isEmpty()) {
			Predicate<RepeatContext<ServerWebExchange>> repeatPredicate = context -> {
				ServerWebExchange exchange = context.applicationContext();
				if (exceedsMaxIterations(exchange, retryConfig)) {
					return false;
				}

				HttpStatus statusCode = exchange.getResponse().getStatusCode();
				HttpMethod httpMethod = exchange.getRequest().getMethod();

				boolean retryableStatusCode = retryConfig.getStatuses().contains(statusCode);

				if (!retryableStatusCode && statusCode != null) { // null status code might mean a network exception?
					// try the series
					retryableStatusCode = retryConfig.getSeries().stream()
							.anyMatch(series -> statusCode.series().equals(series));
				}

				boolean retryableMethod = retryConfig.getMethods().contains(httpMethod);
				return retryableMethod && retryableStatusCode;
			};

			statusCodeRepeat = Repeat.onlyIf(repeatPredicate)
					.doOnRepeat(context -> reset(context.applicationContext()));
		}

		//TODO: DISCO-2348 support timeout, backoff, jitter, etc... in Builder

		Retry<ServerWebExchange> exceptionRetry = null;
		if (!retryConfig.getExceptions().isEmpty()) {
			Predicate<RetryContext<ServerWebExchange>> retryContextPredicate = context -> {
				if (exceedsMaxIterations(context.applicationContext(), retryConfig)) {
					return false;
				}

				for (Class<? extends Throwable> clazz : retryConfig.getExceptions()) {
					if (clazz.isInstance(context.exception())) {
						return true;
					}
				}
				return false;
			};
			exceptionRetry = Retry.onlyIf(retryContextPredicate)
					.doOnRetry(context -> reset(context.applicationContext()))
					.retryMax(retryConfig.getRetries());
		}


		return apply(retryConfig, statusCodeRepeat, exceptionRetry);
	}

	public boolean exceedsMaxIterations(ServerWebExchange exchange, RetryConfig retryConfig) {
		Integer iteration = exchange.getAttribute(RETRY_ITERATION_KEY);

		//TODO: DISCO-2349 deal with null iteration
		return iteration != null && iteration >= retryConfig.getRetries();
	}

	public void reset(ServerWebExchange exchange) {
		//TODO: DISCO-2350 what else to do to reset SWE?
		exchange.getAttributes().remove(ServerWebExchangeUtils.GATEWAY_ALREADY_ROUTED_ATTR);
	}

	public GatewayFilter apply(RetryConfig config, Repeat<ServerWebExchange> repeat, Retry<ServerWebExchange> retry) {
		return (exchange, chain) -> {
			if (log.isTraceEnabled()) {
				log.trace("Entering retry-filter");
			}

			// chain.filter returns a Mono<Void>
            Publisher<Void> publisher = chain.filter(exchange)
											 /*
											  CHANGED
											  Sets a timeout for requests of the configured method.
											  */
                                             .compose(filterChainResult -> {
                                                 if (config.getMethods().contains(exchange.getRequest().getMethod())) {
													 final int iteration = exchange.getAttributeOrDefault(RETRY_ITERATION_KEY, -1) + 1;
													 final long timeoutInMs = calculateTimeout(config, iteration);
													 log.debug("Setting {}ms timeout on attempt {}", timeoutInMs, (iteration + 1));
													 return TimeoutUtil.timeout(filterChainResult, Duration.ofMillis(timeoutInMs));
												 } else {
                                                 	return filterChainResult;
												 }
											 })
                    //.log("retry-filter", Level.INFO)
                    .doOnSuccessOrError((aVoid, throwable) -> {
                        int iteration = exchange.getAttributeOrDefault(RETRY_ITERATION_KEY, -1);
                        exchange.getAttributes().put(RETRY_ITERATION_KEY, iteration + 1);
                    });

            if (retry != null) {
				// retryWhen returns a Mono<Void>
				// retry needs to go before repeat
				publisher = ((Mono<Void>)publisher).retryWhen(retry.withApplicationContext(exchange));
			}
			if (repeat != null) {
            	// repeatWhen returns a Flux<Void>
				// so this needs to be last and the variable a Publisher<Void>
				publisher = ((Mono<Void>)publisher).repeatWhen(repeat.withApplicationContext(exchange));
			}

            return Mono.fromDirect(publisher);
		};
	}

	// ADDED
	static long calculateTimeout(RetryConfig config, double iteration) {
		final long unboundTimeout = (long) (config.getMinimumTimeout() * Math.pow(config.getTimeoutExponentialScalingBase(),
																				  iteration));
		return Math.min(unboundTimeout, config.getMaximumTimeout());
	}

	private static <T> List<T> toList(T... items) {
		return new ArrayList<>(Arrays.asList(items));
	}

	/*
	CHANGED
	Added configuration for timeout:
	- timeoutExponentialScalingBase
	- minimumTimeout
	- maximumTimeout
	 */
	@SuppressWarnings("unchecked")
	@Data
	public static class RetryConfig {
		private int retries = 3;
		private double timeoutExponentialScalingBase = 2.0;
		private long minimumTimeout = 1000;
		private long maximumTimeout = 30000;

		private List<Series> series = toList(Series.SERVER_ERROR);
		
		private List<HttpStatus> statuses = new ArrayList<>();
		
		private List<HttpMethod> methods = toList(HttpMethod.GET, HttpMethod.HEAD, HttpMethod.OPTIONS);

		private List<Class<? extends Throwable>> exceptions = toList(IOException.class, TimeoutException.class);

		public void validate() {
			Assert.isTrue(this.retries > 0, "retries must be greater than 0");
			Assert.isTrue(!this.series.isEmpty() || !this.statuses.isEmpty() || !this.exceptions.isEmpty(),
					"series, status and exceptions may not all be empty");
			Assert.notEmpty(this.methods, "methods may not be empty");
		}
	}
}

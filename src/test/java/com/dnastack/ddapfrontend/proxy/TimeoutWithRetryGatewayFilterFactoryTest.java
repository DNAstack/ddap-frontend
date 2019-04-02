package com.dnastack.ddapfrontend.proxy;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpMethod;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.concurrent.TimeoutException;

import static java.util.Collections.singletonList;
import static org.junit.Assert.fail;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class TimeoutWithRetryGatewayFilterFactoryTest {

    @InjectMocks
    TimeoutWithRetryGatewayFilterFactory subject;

    @Mock
    WebClient webClient;

    @Mock
    ServerWebExchange exchange;

    @Mock
    GatewayFilterChain chain;

    @Mock
    ServerHttpRequest request;

    @Test
    public void shouldNotRetryForNonMatchingHttpMethods() {
        TimeoutWithRetryGatewayFilterFactory.Config config = new TimeoutWithRetryGatewayFilterFactory.Config();
        config.setApplicableMethods(singletonList(HttpMethod.GET));
        config.setBaseTimeout(5);
        config.setMaxAttempts(1);

        Mono<Void> action = Mono.fromRunnable(() -> {
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
        });
        when(chain.filter(any())).thenReturn(action);
        when(exchange.getRequest()).thenReturn(request);
        when(request.getMethod()).thenReturn(HttpMethod.POST);

        final GatewayFilter filter = subject.apply(config);
        final Mono<Void> filteredAction = filter.filter(exchange, chain);

        try {
            filteredAction.block();
            verifyNoMoreInteractions(webClient);
        } catch (RuntimeException wrapped) {
            try {
                // Mono.block wraps checked exceptions
                throw wrapped.getCause();
            } catch (Throwable e) {
                throw new AssertionError("Expected the action to complete normally, but observed an exception", e);
            }
        }
    }

    @Test
    public void shouldTimeoutForMatchingHttpMethods() {
        TimeoutWithRetryGatewayFilterFactory.Config config = new TimeoutWithRetryGatewayFilterFactory.Config();
        config.setApplicableMethods(singletonList(HttpMethod.GET));
        config.setBaseTimeout(5);
        config.setMaxAttempts(1);

        Mono<Void> action = Mono.fromRunnable(() -> {
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
        });
        when(chain.filter(any())).thenReturn(action);
        when(exchange.getRequest()).thenReturn(request);
        when(request.getMethod()).thenReturn(HttpMethod.GET);

        final GatewayFilter filter = subject.apply(config);
        final Mono<Void> filteredAction = filter.filter(exchange, chain);

        try {
            filteredAction.block();
            fail("This mono should throw a TimeoutException");
        } catch (RuntimeException wrapped) {
            try {
                // Mono.block wraps checked exceptions
                throw wrapped.getCause();
            } catch (TimeoutException e) {
                // make sure we never retried
                verifyNoMoreInteractions(webClient);
            } catch (Throwable t) {
                throw new AssertionError("Unexpected error from mono", t);
            }
        }
    }
}

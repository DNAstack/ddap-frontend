/*
 * Copyright 2013-2017 the original author or authors.
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

import com.dnastack.ddap.common.util.LoggingWebFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

/**
 * Logs requests and responses going through the gateway.
 */
@Component
public class LoggingGatewayFilterFactory extends AbstractGatewayFilterFactory {

	private final LoggingWebFilter loggingFilter;

	@Autowired
	public LoggingGatewayFilterFactory(LoggingWebFilter loggingFilter) {
		this.loggingFilter = loggingFilter;
	}

	@Override
	public GatewayFilter apply(Object config) {
		return (exchange, chain) -> loggingFilter.filter(exchange, chain::filter);
	}
}

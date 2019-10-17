package com.dnastack.ddap.common.proxy;

import lombok.Data;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class PrependPathGatewayFilterFactory extends AbstractGatewayFilterFactory<PrependPathGatewayFilterFactory.Config> {

	public PrependPathGatewayFilterFactory() {
		super(Config.class);
	}

	@Override
	public List<String> shortcutFieldOrder() {
		return Arrays.asList("path");
	}

	@Override
	public GatewayFilter apply(Config config) {
		return (exchange, chain) ->  {
			final ServerHttpRequest request = exchange.getRequest();
			final String path = request.getURI().getRawPath();
			final String newPath = config.getPath() + path;
			ServerHttpRequest newRequest = request.mutate()
												  .path(newPath)
												  .build();

			return chain.filter(exchange.mutate().request(newRequest).build());
		};
	}

	@Data
	public static class Config {
		private String path;
	}
}

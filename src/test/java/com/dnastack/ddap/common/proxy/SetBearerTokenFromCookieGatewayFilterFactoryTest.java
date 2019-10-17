package com.dnastack.ddap.common.proxy;

import com.dnastack.ddap.common.security.UserTokenCookiePackager;
import com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.web.server.ServerWebExchange;

import java.net.URI;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

@SuppressWarnings("UnassignedFluxMonoInstance")
public class SetBearerTokenFromCookieGatewayFilterFactoryTest {

    GatewayFilter filter;

    @Before
    public void setUp() {
        UserTokenCookiePackager cookiePackager = new UserTokenCookiePackager();
        SetBearerTokenFromCookieGatewayFilterFactory filterFactory = new SetBearerTokenFromCookieGatewayFilterFactory(cookiePackager);
        SetBearerTokenFromCookieGatewayFilterFactory.Config config = new SetBearerTokenFromCookieGatewayFilterFactory.Config();
        config.setCookieKind(CookieKind.DAM);
        filter = filterFactory.apply(config);
    }

    @Test
    public void shouldCopyUserTokenCookieAsBearerTokenInOnwardRequest() {
        // given
        String cookieToken = "attach this as a bearer token and everyone's happy!";
        URI originalUri = URI.create("http://example.com/anything");

        ServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get("http://example.com/anything")
                                     .cookie(new HttpCookie(CookieKind.DAM.cookieName(), cookieToken)).build());

        GatewayFilterChain chain = mock(GatewayFilterChain.class);

        // when
        filter.filter(exchange, chain);

        // then
        ArgumentCaptor<ServerWebExchange> result = ArgumentCaptor.forClass(ServerWebExchange.class);
        verify(chain).filter(result.capture());
        ServerHttpRequest onwardRequest = result.getValue().getRequest();
        assertThat(onwardRequest.getURI(), is(originalUri));
        assertThat(onwardRequest.getHeaders().getFirst("Authorization"), is("Bearer " + cookieToken));
    }

    @Test
    public void shouldPassThroughRequestsWithoutCookie() {
        // given
        URI originalUri = URI.create("http://example.com/anything");

        ServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get(originalUri.toString()).build());

        GatewayFilterChain chain = mock(GatewayFilterChain.class);

        // when
        filter.filter(exchange, chain);

        // then
        ArgumentCaptor<ServerWebExchange> result = ArgumentCaptor.forClass(ServerWebExchange.class);
        verify(chain).filter(result.capture());
        URI onwardRequestUri = result.getValue().getRequest().getURI();
        assertThat(onwardRequestUri, is(originalUri));
    }

}
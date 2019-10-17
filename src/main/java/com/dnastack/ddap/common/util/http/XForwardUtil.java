package com.dnastack.ddap.common.util.http;

import io.netty.handler.codec.http.HttpRequest;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.reactive.function.server.ServerRequest;

import java.net.URI;
import java.util.Optional;

import static java.lang.String.format;
import static org.springframework.security.web.util.UrlUtils.buildFullRequestUrl;

public class XForwardUtil {

    private static final int HTTPS_DEFAULT_PORT = 443;
    private static final int HTTP_DEFAULT = 80;

    private interface Request {
        String getHeader(String headerName);
        URI getUri();
    }

    /**
     * Infers the existence of a reverse proxy from 'X-Forwarded-*' headers and generates a URL with the correct
     * protocol when necessary.
     *
     * @param request Never null. Headers in this request are used to infer reverse proxy setup.
     * @param path Never null.
     * @return The full URL with the externally visible hostname, port, and protocol, using the values from
     *          X-Forwarded-* headers if present, or else the literal values from the given request.
     */
    public static String getExternalPath(HttpRequest request, String path) {
        return getExternalPath(new NettyRequestAdapter(request), path);
    }

    /**
     * Infers the existence of a reverse proxy from 'X-Forwarded-*' headers and generates a URL with the correct
     * protocol when necessary.
     *
     * @param request Never null. Headers in this request are used to infer reverse proxy setup.
     * @param path Never null.
     * @return The full URL with the externally visible hostname, port, and protocol, using the values from
     *          X-Forwarded-* headers if present, or else the literal values from the given request.
     */
    public static String getExternalPath(ServerRequest request, String path) {
        return getExternalPath(new SpringServerRequestAdapter(request), path);
    }

    /**
     * Infers the existence of a reverse proxy from 'X-Forwarded-*' headers and generates a URL with the correct
     * protocol when necessary.
     *
     * @param request Never null. Headers in this request are used to infer reverse proxy setup.
     * @param path Never null.
     * @return The full URL with the externally visible hostname, port, and protocol, using the values from
     *          X-Forwarded-* headers if present, or else the literal values from the given request.
     */
    public static String getExternalPath(ServerHttpRequest request, String path) {
        return getExternalPath(new SpringServerHttpRequestAdapter(request), path);
    }

    /**
     * Infers the existence of a reverse proxy from 'X-Forwarded-*' headers and returns the hostname
     * the client originally made this request to.
     *
     * @param request Never null. Headers in this request are used to infer reverse proxy setup.
     * @return The hostname the client originally made this request to, using the values from
     *          X-Forwarded-* headers if present, or else the literal values from the given request.
     */
    public static String getExternalHost(ServerHttpRequest request) {
        return getExternalHost(new SpringServerHttpRequestAdapter(request));
    }

    private static String getExternalPath(Request request, String path) {
        final int port = getExternalPort(request);
        final String protocol = getExternalProto(request);
        final String host = getExternalHost(request);
        return buildFullRequestUrl(protocol, host, port, path, null);
    }

    private static String getExternalHost(Request request) {
        return Optional.ofNullable(request.getHeader("x-forwarded-host"))
                       .orElseGet(() -> request.getUri().getHost());
    }

    private static String getExternalProto(Request request) {
        return Optional.ofNullable(request.getHeader("x-forwarded-proto"))
                       .orElseGet(() -> request.getUri().getScheme());
    }

    private static int getExternalPort(Request req) {
        final String xForwardedPort = req.getHeader("x-forwarded-port");
        if (xForwardedPort != null) {
            return Integer.valueOf(xForwardedPort);
        }

        final String xForwardedProto = req.getHeader("x-forwarded-proto");
        if ("https".equals(xForwardedProto)) {
            return HTTPS_DEFAULT_PORT;
        } else if ("http".equals(xForwardedProto)) {
            return HTTP_DEFAULT;
        }

        final URI uri = req.getUri();
        final int uriPort = uri.getPort();
        if (uriPort > 0) {
            return uriPort;
        } else if ("https".equals(uri.getScheme())) {
            return HTTPS_DEFAULT_PORT;
        } else if ("http".equals(uri.getScheme())) {
            return HTTP_DEFAULT;
        } else {
            throw new RuntimeException(format("Unable to infer port. uri=%s", uri));
        }
    }

    private static class NettyRequestAdapter implements Request {
        private final HttpRequest request;

        public NettyRequestAdapter(HttpRequest request) {
            this.request = request;
        }

        @Override
        public String getHeader(String headerName) {
            return request.headers().get(headerName);
        }

        @Override
        public URI getUri() {
            return URI.create(request.uri());
        }
    }

    private static class SpringServerRequestAdapter implements Request {
        private final ServerRequest request;

        public SpringServerRequestAdapter(ServerRequest request) {
            this.request = request;
        }

        @Override
        public String getHeader(String headerName) {
            return request.headers()
                          .header(headerName)
                          .stream()
                          .findFirst()
                          .orElse(null);
        }

        @Override
        public URI getUri() {
            return request.uri();
        }
    }

    private static class SpringServerHttpRequestAdapter implements Request {
        private final ServerHttpRequest request;

        public SpringServerHttpRequestAdapter(ServerHttpRequest request) {
            this.request = request;
        }

        @Override
        public String getHeader(String headerName) {
            return request.getHeaders().getFirst(headerName);
        }

        @Override
        public URI getUri() {
            return request.getURI();
        }
    }
}

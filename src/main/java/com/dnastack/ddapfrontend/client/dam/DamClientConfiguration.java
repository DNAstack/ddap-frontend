package com.dnastack.ddapfrontend.client.dam;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.*;
import feign.codec.Decoder;
import feign.codec.Encoder;
import feign.okhttp.OkHttpClient;
import io.github.resilience4j.retry.Retry;
import io.github.resilience4j.retry.RetryConfig;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.ResponseEntityDecoder;
import org.springframework.cloud.openfeign.support.SpringDecoder;
import org.springframework.cloud.openfeign.support.SpringEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.net.SocketTimeoutException;
import java.time.Duration;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.IntFunction;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.springframework.core.NestedExceptionUtils.getMostSpecificCause;

@Slf4j
@Configuration
public class DamClientConfiguration {

    //Autowire the message converters.
    @Autowired
    private ObjectFactory<HttpMessageConverters> messageConverters;

    //override the encoder
    @Bean
    public Encoder springEncoder(){
        return new SpringEncoder(this.messageConverters);
    }

    //override the encoder
    @Bean
    public Decoder springDecoder(){
        return new ResponseEntityDecoder(new SpringDecoder(this.messageConverters));
    }

    private static DamClient retryableClient(int retries,
                                             double timeoutExponentialScalingBase,
                                             int minimumTimeout,
                                             int maximumTimeout,
                                             IntFunction<DamClient> nonRetryableClientFactory) {
        final org.slf4j.Logger log = LoggerFactory.getLogger(DamClient.class);
        final Retry retry = Retry.of(DamClient.class.getSimpleName(),
                                     RetryConfig.custom()
                                                .maxAttempts(retries + 1)
                                                .waitDuration(Duration.ofMillis(10))
                                                .retryOnException(raw -> (getMostSpecificCause(raw) instanceof SocketTimeoutException))
                                                .build());

        return (DamClient) Proxy.newProxyInstance(DamClient.class.getClassLoader(),
                                          new Class<?>[]{DamClient.class},
                                          (Object o, Method method, Object[] args) -> {
                                              final AtomicInteger attemptCounter = new AtomicInteger(1);

                                              return retry.executeCallable(() -> {
                                                  final int attempt = attemptCounter.getAndIncrement();
                                                  final int timeout = Math.min(minimumTimeout * ((int) Math.pow(
                                                          timeoutExponentialScalingBase,
                                                          attempt - 1)), maximumTimeout);
                                                  final Object clientProxy = nonRetryableClientFactory.apply(timeout);
                                                  try {
                                                      log.info(
                                                              "Starting request attempt {} with timeout {}ms",
                                                              attempt,
                                                              timeout);
                                                      return Proxy.getInvocationHandler(clientProxy)
                                                                  .invoke(o, method, args);
                                                  } catch (Throwable throwable) {
                                                      // Have to wrap to match signature (throws Exception) and avoid
                                                      // UndeclaredThrowableException from proxy invocation handler
                                                      throw new WrappedException(throwable);
                                                  }
                                              });
                                          });
    }

    @Bean
    public DamClient damClient(
            @Value("${dam.base-url}") String url,
            @Value("${dam.client-id}") String clientId,
            @Value("${dam.client-secret}") String clientSecret) {
        Client httpClient = new OkHttpClient();

        ObjectMapper damObjectMapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        /*
         * We can't dynamically set read timeouts with Feign, so we can't make use of it's built-in
         * retry mechanism. Instead, we use resilience4j to retry and use a different feign client on each
         * attempt so that we can dynamically increase the read timeout.
         */
        IntFunction<DamClient> nonRetryableClientFactory = readTimeoutMillis -> {
            final int connectTimeoutMillis = Math.min((int) SECONDS.toMillis(10), readTimeoutMillis);
            return Feign.builder()
                        .client(httpClient)
                        .options(new Request.Options(connectTimeoutMillis, readTimeoutMillis))
                        .encoder(springEncoder())
                        .decoder(springDecoder())
                        .logger(new Logger() {
                            @Override
                            protected void log(String configKey, String format, Object... args) {
                                log.info("{} {}", configKey, String.format(format, args));
                            }

                            @Override
                            protected IOException logIOException(String configKey, Level logLevel, IOException ioe, long elapsedTime) {
                                if (ioe instanceof SocketTimeoutException) {
                                    log.info("{} Socket timeout occurred after {} -- see trace logging for trace", configKey, elapsedTime);
                                    log.trace(String.format("%s SocketTimeoutException", configKey), ioe);
                                    return ioe;
                                } else {
                                    return super.logIOException(configKey, logLevel, ioe, elapsedTime);
                                }
                            }
                        })
                        .retryer(Retryer.NEVER_RETRY)
                        .logLevel(Logger.Level.FULL)
                        .requestInterceptor(template -> template
                                .query("clientId", clientId)
                                .query("clientSecret", clientSecret))
                        .target(DamClient.class, url);
        };

        // Didn't bother making this configurable because we may have to replace it with reactor web client soon anyway
        return retryableClient(2, 3.0, 1000, 30000, nonRetryableClientFactory);
    }

    static class WrappedException extends RuntimeException {
        WrappedException(Throwable cause) {
            super(cause);
        }
    }
}

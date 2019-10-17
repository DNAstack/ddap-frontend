package com.dnastack.ddap.common.util;

import lombok.Value;
import org.springframework.cloud.gateway.support.TimeoutException;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Optional;

public class TimeoutUtil {
    /**
     * Wraps a Mono in timeout logic.
     *
     * @param action  A mono to be wrapped in a timeout. Must not be null.
     * @param timeout Timeout duration. Must not be null.
     * @param <T> Type returned by the given mono.
     * @return A new mono that will throw a {@link TimeoutException} after the timeout duration elapses.
     */
    public static <T> Mono<T> timeout(Mono<T> action, Duration timeout) {
        @Value
        class Ref<T> {
            private T value;
        }

        /*
         Doing `filterChainResult.timeout(timeoutInMs)` breaks retrying,
         so we need to construct to enforce the timeout another way.
         */
        final Mono<Optional<Ref<T>>> delay = Mono.delay(timeout)
                                                 .map(ignore -> Optional.empty());
        final Mono<Optional<Ref<T>>> actual = action.map(value -> Optional.of(new Ref<>(value)));
        final Mono<Optional<Ref<T>>> gate = Mono.first(delay, actual);

        return gate.flatMap(ref -> ref.map(Ref::getValue)
                                      .map(Mono::just)
                                      .orElseGet(() -> Mono.error(new TimeoutException())));
    }
}

package com.dnastack.ddap.common.proxy;

import com.dnastack.ddap.common.proxy.TimeoutAndRetryGatewayFilterFactory.RetryConfig;
import org.junit.Test;

import static com.dnastack.ddap.common.proxy.TimeoutAndRetryGatewayFilterFactory.calculateTimeout;
import static org.assertj.core.api.Assertions.assertThat;

public class TimeoutAndRetryGatewayFilterFactoryTest {

    @Test
    public void firstCalculatedTimeoutIsGivenMinimum() {
        final RetryConfig retryConfig = new RetryConfig();
        retryConfig.setMinimumTimeout(100);
        retryConfig.setMaximumTimeout(9999);
        retryConfig.setTimeoutExponentialScalingBase(3.0);

        final long observed = calculateTimeout(retryConfig, 0);
        assertThat(observed).isEqualTo(100);
    }

    @Test
    public void nthCalculatedTimeoutIsGivenMinimumByPowerOfScalingFactor() {
        final RetryConfig retryConfig = new RetryConfig();
        retryConfig.setMinimumTimeout(100);
        retryConfig.setMaximumTimeout(999999999);
        retryConfig.setTimeoutExponentialScalingBase(3.0);

        final long observed = calculateTimeout(retryConfig, 2);
        assertThat(observed).isEqualTo((long) (100 * Math.pow(3.0, 2)));
    }

    @Test
    public void nthCalculatedTimeoutNeverExceedsMaximum() {
        final RetryConfig retryConfig = new RetryConfig();
        retryConfig.setMinimumTimeout(100);
        retryConfig.setMaximumTimeout(500);
        retryConfig.setTimeoutExponentialScalingBase(3.0);

        final long observed = calculateTimeout(retryConfig, 100);
        assertThat(observed).isEqualTo(500L);
    }
}
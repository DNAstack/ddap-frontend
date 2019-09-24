package com.dnastack.ddap.common.util;

import org.junit.rules.TestRule;
import org.junit.runner.Description;
import org.junit.runners.model.Statement;

// https://stackoverflow.com/a/8301639
public class RetryRule implements TestRule {
    private int retryCount;

    public RetryRule(int retryCount) {
        this.retryCount = retryCount;
    }

    public Statement apply(Statement base, Description description) {
        return statement(base, description);
    }

    private Statement statement(final Statement base, final Description description) {
        return new Statement() {
            @Override
            public void evaluate() throws Throwable {
                Throwable throwable = null;
                for (int i = 0; i < retryCount; i++) {
                    try {
                        base.evaluate();
                        return;
                    } catch (Throwable t) {
                        throwable = t;
                        System.err.println(description.getDisplayName() + ": run " + (i+1) + " failed");
                    }
                }
                System.err.println(description.getDisplayName() + ": giving up after " + retryCount + " failures");
                if (throwable != null) {
                    throw throwable;
                }
            }
        };
    }
}

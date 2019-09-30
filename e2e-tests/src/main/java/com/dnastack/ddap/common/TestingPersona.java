package com.dnastack.ddap.common;

public enum TestingPersona {

    ADMINISTRATOR("administrator"),
    USER_WITH_ACCESS("test_user_with_access"),
    USER_WITHOUT_ACCESS("test_user_without_access");

    private String value;

    public String getValue() {
        return value;
    }

    TestingPersona(String value) {
        this.value = value;
    }
}

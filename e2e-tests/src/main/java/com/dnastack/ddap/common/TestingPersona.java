package com.dnastack.ddap.common;

public enum TestingPersona {

    ADMINISTRATOR("administrator"),
    USER_WITH_ACCESS("test_user_with_access"),
    USER_WITHOUT_ACCESS("test_user_without_access");

    private String id;

    public String getId() {
        return id;
    }

    TestingPersona(String id) {
        this.id = id;
    }
}

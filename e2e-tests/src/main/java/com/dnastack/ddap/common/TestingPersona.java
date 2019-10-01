package com.dnastack.ddap.common;

public enum TestingPersona {

    ADMINISTRATOR("administrator") {
        @Override
        public String getEmail() {
            throw new UnsupportedOperationException("Can't depend on email of administrator in tests because the admin account may be a real wallet user, not a test user or persona.");
        }
    },
    USER_WITH_ACCESS("test_user_with_access"),
    USER_WITHOUT_ACCESS("test_user_without_access");

    private String id;

    public String getId() {
        return id;
    }

    public String getEmail() {
        return getId().replace('_', '-') + "@dnastack.com";
    }

    TestingPersona(String id) {
        this.id = id;
    }
}

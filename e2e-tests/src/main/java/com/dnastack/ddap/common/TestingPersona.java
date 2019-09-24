package com.dnastack.ddap.common;

public enum TestingPersona {

    ADMINISTRATOR("administrator"),
    NCI_RESEARCHER("nci_researcher"),
    DR_JOE_ELIXIR("dr_joe_elixir"),
    JOHN("john");

    private String value;

    public String getValue() {
        return value;
    }

    TestingPersona(String value) {
        this.value = value;
    }
}

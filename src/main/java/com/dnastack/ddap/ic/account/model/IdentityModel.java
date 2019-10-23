package com.dnastack.ddap.ic.account.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
public class IdentityModel {

    private Object account;
    private List<String> scopes;
    private List<Access> accesses;
    private boolean sandbox;

    @Data
    public static class Access {

        private Target target;
        private Boolean isAdmin;

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Target {
        private Service service;
        private String id;
    }

    public enum Service {
        DAM, IC;
    }
}

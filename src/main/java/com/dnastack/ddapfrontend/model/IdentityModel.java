package com.dnastack.ddapfrontend.model;

import lombok.Builder;
import lombok.Data;

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

        private String target;
        private Boolean isAdmin;

    }

}

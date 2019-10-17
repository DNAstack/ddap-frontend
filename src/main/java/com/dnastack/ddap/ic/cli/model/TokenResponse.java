package com.dnastack.ddap.ic.cli.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenResponse {
    private String idToken;
    private String accessToken;
}

package com.dnastack.ddap.ic.cli.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.net.URI;

@Data
@AllArgsConstructor
public class CliLoginStatus {
    private TokenResponse tokens;
    private URI webLoginUrl;
}

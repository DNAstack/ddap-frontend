package com.dnastack.ddapfrontend.cli;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.net.URI;

@Data
@AllArgsConstructor
public class CliLoginStatus {
    private TokenResponse tokens;
    private URI webLoginUrl;
}

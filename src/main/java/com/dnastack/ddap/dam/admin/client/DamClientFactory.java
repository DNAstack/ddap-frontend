package com.dnastack.ddap.dam.admin.client;

import com.dnastack.ddap.common.client.AuthAwareWebClientFactory;
import com.dnastack.ddap.dam.common.config.Dam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Stream;

import static java.lang.String.format;

@Component
public class DamClientFactory {

    private final Map<String, Dam> dams;
    private final AuthAwareWebClientFactory webClientFactory;

    @Autowired
    public DamClientFactory(@Qualifier("dams") Map<String, Dam> dams, AuthAwareWebClientFactory webClientFactory) {
        this.dams = Collections.unmodifiableMap(dams);
        this.webClientFactory = webClientFactory;
    }

    public ReactiveDamClient getDamClient(String damId) {
        final Dam dam = dams.get(damId);
        if (dam == null) {
            throw new IllegalArgumentException(format("Unknown damId [%s]", damId));
        }

        return new ReactiveDamClient(URI.create(dam.getBaseUrl()),
                                     dam.getClientId(),
                                     dam.getClientSecret(),
                                     webClientFactory);
    }

    public Stream<Map.Entry<String, ReactiveDamClient>> allDamClients() {
        return dams.keySet()
                   .stream()
                   .map(id -> Map.entry(id, getDamClient(id)));
    }
}

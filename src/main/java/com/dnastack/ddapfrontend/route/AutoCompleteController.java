package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.dam.model.DamCondition;
import com.dnastack.ddapfrontend.client.dam.model.DamConfig;
import com.dnastack.ddapfrontend.client.dam.model.DamPolicy;
import com.dnastack.ddapfrontend.config.Dam;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@RestController
@RequestMapping("/api/v1alpha/{realm}/autocomplete")
public class AutoCompleteController {

    private DamClientFactory damClientFactory;
    private UserTokenCookiePackager cookiePackager;
    private Map<String, Dam> dams;

    @Autowired
    public AutoCompleteController(DamClientFactory damClientFactory,
                                  UserTokenCookiePackager cookiePackager,
                                  @Qualifier("dams") Map<String, Dam> dams) {
        this.damClientFactory = damClientFactory;
        this.cookiePackager = cookiePackager;
        this.dams = dams;
    }

    /*
     * Temporary hack while we work on DISCO-2276
     */
    @GetMapping("/claimValue")
    public Mono<List<String>> getClaimValues(@RequestParam String claimName,
                                             ServerHttpRequest request,
                                             @PathVariable String realm) {
        if (dams.size() != 1) {
            throw new IllegalArgumentException("Must specify DAM ID when more than one DAM is configured.");
        }

        return getClaimValues(claimName, request, realm, dams.keySet().iterator().next());
    }

    //Reading the realm config
    //Iterate through realm config policies and find all the values in policies
    @GetMapping("claimValue/{damId}")
    public Mono<List<String>> getClaimValues(@RequestParam String claimName,
                                             ServerHttpRequest request,
                                             @PathVariable String realm,
                                             @PathVariable String damId) {
        List<String> result = new ArrayList<>();

        // find beacons under resourceId in DAM config
        Optional<String> foundDamToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        Optional<String> foundRefreshToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.REFRESH);

        String damToken = foundDamToken.orElseThrow(() -> new IllegalArgumentException("Authorization dam token is required."));
        String refreshToken = foundRefreshToken.orElseThrow(() -> new IllegalArgumentException("Authorization refresh token is required."));

        final ReactiveDamClient damClient = damClientFactory.getDamClient(damId);

        return damClient.getConfig(realm, damToken, refreshToken)
                        .flatMap((damConfig) -> {
                    Map<String, DamPolicy> policies = damConfig.getPolicies();
                    for (Map.Entry<String, DamPolicy> policy : policies.entrySet()) {
                        DamCondition allow = policy.getValue().getAllow();
                        DamCondition disallow = policy.getValue().getDisallow();
                        if (allow != null) {
                            result.addAll(getAllContainedValues(claimName, allow, damConfig, policy.getKey()));
                        }
                        if (disallow != null) {
                            result.addAll(getAllContainedValues(claimName, disallow, damConfig, policy.getKey()));
                        }
                    }
                    Collections.sort(result);
                    return Mono.just(result);
                });
    }

    private List<String> getAllContainedValues(String claimName, DamCondition condition, DamConfig damConfig, String policyName) {
        Stream<String> directValues;
        if (Objects.equals(claimName, condition.getClaim())) {
            directValues = condition.getValues()
                                    .stream()
                                    .flatMap(valueOrVariable -> getParsedVariableValues(valueOrVariable, policyName, damConfig).stream());
        } else {
            directValues = Stream.empty();
        }

        Stream<String> allTrueValues = condition.getAllTrue().stream().flatMap(cond -> getAllContainedValues(claimName, cond, damConfig, policyName).stream());
        Stream<String> anyTrueValues = condition.getAnyTrue().stream().flatMap(cond -> getAllContainedValues(claimName, cond, damConfig, policyName).stream());
        return Stream.concat(directValues, Stream.concat(allTrueValues, anyTrueValues)).collect(Collectors.toList());
    }

    private List<String> getParsedVariableValues(String valueOrVariable, String policyName, DamConfig damConfig) {
        boolean isVariable = valueOrVariable.startsWith("${") && valueOrVariable.endsWith("}");
        if (isVariable) {
            //variableName is: "${DATASETS}" cleaned up to "DATASETS"
            String variableName = valueOrVariable.substring(2, valueOrVariable.length() - 1);
            return getPoliciesInResourceViews(damConfig)
                    //Filter would match something like: variablePolicy(VAR1=value1,value2;VAR2=value3,value4)
                     .filter(resourcePolicyName -> resourcePolicyName.startsWith(policyName + "(") && resourcePolicyName.endsWith(")"))
                     .flatMap(policyValueString -> {
                         List<String> assignmentList = Arrays.asList(policyValueString.substring(policyName.length() + 1, policyValueString.length() - 1).split(";"));

                         return getValuesForVariable(variableName, assignmentList)
                                              .filter(assignmentValue -> !isRegexValue(assignmentValue));
                     }).collect(Collectors.toList());
        } else if (!isRegexValue(valueOrVariable)) {
            return Collections.singletonList(valueOrVariable);
        } else {
            return Collections.emptyList();
        }
    }

    //Gets something like: DATASETS=^https?://dac\.nih\.gov/datasets/phs000710$,https://dac.nih.gov/datasets/phs000711,https://dac.nih.gov/datasets/phs000712
    //Returns the RHS split by comma something like: ^https?://dac\.nih\.gov/datasets/phs000710$, https://dac.nih.gov/datasets/phs000711, https://dac.nih.gov/datasets/phs000712
    private Stream<String> getValuesForVariable(String variableName, List<String> assignmentList) {
        return assignmentList.stream()
                             .filter(assignment -> {
                                 String[] assignmentParts = assignment.split("=");
                                 return assignmentParts[0].equals(variableName);
                             })
                             .map(variableAssignmentChunk -> {
                                 String[] variableAssignment = variableAssignmentChunk.split("=");
                                 return variableAssignment[1];
                             })
                             .flatMap(rhsAssignment -> Arrays.stream(rhsAssignment.split(",")));
    }

    private Stream<String> getPoliciesInResourceViews(DamConfig damConfig) {
        return damConfig.getResources().values().stream()
                .flatMap(res -> res.getViews().values().stream())
                .flatMap(view -> view.getRoles().values().stream())
                .flatMap(accessRole -> accessRole.getPolicies().stream());
    }

    private boolean isRegexValue(String assignmentValue) {
        return assignmentValue.startsWith("^") && assignmentValue.endsWith("$");
    }

}

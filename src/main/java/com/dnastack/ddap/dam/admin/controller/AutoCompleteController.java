package com.dnastack.ddap.dam.admin.controller;

import com.dnastack.ddap.common.security.UserTokenCookiePackager;
import com.dnastack.ddap.dam.admin.client.DamAdminClientFactory;
import com.dnastack.ddap.dam.admin.client.ReactiveAdminDamClient;
import dam.v1.DamService;
import dam.v1.DamService.Condition;
import dam.v1.DamService.DamConfig;
import dam.v1.DamService.Policy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;

@Slf4j
@RestController
@RequestMapping("/api/v1alpha/{realm}/dam/{damId}/autocomplete")
public class AutoCompleteController {

    private UserTokenCookiePackager cookiePackager;
    private DamAdminClientFactory damClientFactory;

    @Autowired
    public AutoCompleteController(UserTokenCookiePackager cookiePackager,
                                  DamAdminClientFactory damClientFactory) {
        this.cookiePackager = cookiePackager;
        this.damClientFactory = damClientFactory;
    }

    //Reading the realm config
    //Iterate through realm config policies and find all the values in policies
    @GetMapping("/claim-value")
    public Mono<List<String>> getClaimValues(ServerHttpRequest request,
                                             @PathVariable String realm,
                                             @PathVariable String damId,
                                             @RequestParam String claimName) {
        List<String> result = new ArrayList<>();

        // find beacons under resourceId in DAM config
        Map<CookieKind, String> tokens = cookiePackager.extractRequiredTokens(request, Set.of(CookieKind.DAM, CookieKind.REFRESH));

        final ReactiveAdminDamClient damClient = damClientFactory.getDamClient(damId);

        return damClient.getConfig(realm, tokens.get(CookieKind.DAM), tokens.get(CookieKind.REFRESH))
            .flatMap((damConfig) -> {
                Map<String, Policy> policies = damConfig.getPoliciesMap();
                for (Map.Entry<String, Policy> policy : policies.entrySet()) {
                    Condition allow = policy.getValue().getAllow();
                    Condition disallow = policy.getValue().getDisallow();
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

    private List<String> getAllContainedValues(String claimName, Condition condition, DamService.DamConfig damConfig,
        String policyName) {
        Stream<String> directValues;
        if (Objects.equals(claimName, condition.getClaim())) {
            directValues = condition.getValuesList()
                .stream()
                .flatMap(valueOrVariable -> getParsedVariableValues(valueOrVariable, policyName, damConfig).stream());
        } else {
            directValues = Stream.empty();
        }

        Stream<String> allTrueValues = condition.getAllTrueList().stream()
            .flatMap(cond -> getAllContainedValues(claimName, cond,
                damConfig, policyName).stream());
        Stream<String> anyTrueValues = condition.getAnyTrueList().stream()
            .flatMap(cond -> getAllContainedValues(claimName, cond,
                damConfig, policyName).stream());
        return Stream.concat(directValues, Stream.concat(allTrueValues, anyTrueValues)).collect(Collectors.toList());
    }

    private List<String> getParsedVariableValues(String valueOrVariable, String policyName, DamService.DamConfig damConfig) {
        boolean isVariable = valueOrVariable.startsWith("${") && valueOrVariable.endsWith("}");
        if (isVariable) {
            //variableName is: "${DATASETS}" cleaned up to "DATASETS"
            String variableName = valueOrVariable.substring(2, valueOrVariable.length() - 1);
            return getPoliciesInResourceViews(damConfig)
                //Filter would match something like: variablePolicy(VAR1=value1,value2;VAR2=value3,value4)
                .filter(resourcePolicyName -> resourcePolicyName.startsWith(policyName + "(") && resourcePolicyName
                    .endsWith(")"))
                .flatMap(policyValueString -> {
                    List<String> assignmentList = Arrays
                        .asList(policyValueString.substring(policyName.length() + 1, policyValueString.length() - 1)
                            .split(";"));

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
        return damConfig.getResourcesMap().values().stream()
            .flatMap(res -> res.getViewsMap().values().stream())
            .flatMap(view -> view.getAccessRolesMap().values().stream())
            .flatMap(accessRole -> accessRole.getPoliciesList().stream());
    }

    private boolean isRegexValue(String assignmentValue) {
        return assignmentValue.startsWith("^") && assignmentValue.endsWith("$");
    }

}

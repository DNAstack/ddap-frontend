package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamClient;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import dam.v1.DamService;
import dam.v1.DamService.DamConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.dnastack.ddapfrontend.header.XForwardUtil.getExternalPath;
import static java.lang.String.format;

@Slf4j
@RestController
@RequestMapping("/api/v1alpha/{realm}/autocomplete")
public class AutoCompleteController {

    @Autowired
    private DamClient damClient;

    @Autowired
    private UserTokenCookiePackager cookiePackager;

    //Reading the realm config
    //Iterate through realm config policies and find all the values in policies
    @GetMapping("claimValue")
    public List<String> getClaimValues(@RequestParam String claimName, ServerHttpRequest request, @PathVariable String realm) {
        List<String> result = new ArrayList<>();

        // find beacons under resourceId in DAM config
        Optional<String> foundDamToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        String damToken = foundDamToken.orElseThrow(() -> new IllegalArgumentException("Authorization dam token is required."));
        DamConfig damConfig = damClient.getConfig(damToken, realm);

        Map<String, DamService.Policy> policiesMap = damConfig.getPoliciesMap();

        for (Map.Entry<String, DamService.Policy> policy : policiesMap.entrySet()) {
            DamService.Condition allow = policy.getValue().getAllow();
            DamService.Condition disallow = policy.getValue().getDisallow();
            result.addAll(getAllContainedValues(claimName, allow, damConfig, policy.getKey()));
            result.addAll(getAllContainedValues(claimName, disallow, damConfig, policy.getKey()));
        }
        Collections.sort(result);
        return result;
    }

    private List<String> getAllContainedValues(String claimName, DamService.Condition condition, DamConfig damConfig, String policyName) {
        Stream<String> directValues;
        if (Objects.equals(claimName, condition.getClaim())) {
            directValues = condition.getValuesList()
                                    .stream()
                                    .flatMap(valueOrVariable -> getParsedVariableValues(valueOrVariable, policyName, damConfig).stream());
        } else {
            directValues = Stream.empty();
        }

        Stream<String> allTrueValues = condition.getAllTrueList().stream().flatMap(cond -> getAllContainedValues(claimName, cond, damConfig, policyName).stream());
        Stream<String> anyTrueValues = condition.getAnyTrueList().stream().flatMap(cond -> getAllContainedValues(claimName, cond, damConfig, policyName).stream());
        List<String> collect = Stream.concat(directValues, Stream.concat(allTrueValues, anyTrueValues)).collect(Collectors.toList());
        return collect;
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
        return damConfig.getResourcesMap().values().stream()
                 .flatMap(res -> res.getViewsMap().values().stream())
                 .flatMap(view -> view.getAccessRolesMap().values().stream())
                 .flatMap(accessRole -> accessRole.getPoliciesList().stream());
    }

    private boolean isRegexValue(String assignmentValue) {
        return assignmentValue.startsWith("^") && assignmentValue.endsWith("$");
    }

}

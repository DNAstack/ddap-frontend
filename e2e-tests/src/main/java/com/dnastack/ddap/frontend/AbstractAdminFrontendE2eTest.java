package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.page.AdminDdapPage;
import com.dnastack.ddap.common.page.ICLoginPage;
import com.dnastack.ddap.common.TestingPersona;
import org.junit.BeforeClass;

import java.io.IOException;
import java.lang.invoke.MethodHandles;

public abstract class AbstractAdminFrontendE2eTest extends AbstractFrontendE2eTest {

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        String realm = getRealm();
        String testConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        setupRealmConfig(TestingPersona.ADMINISTRATOR, testConfig, "1", realm);

        ICLoginPage icLoginPage = startLogin(realm);
        ddapPage = icLoginPage.loginAsAdministrator(AdminDdapPage::new);
    }

    private static String getRealm() {
        return generateRealmName(MethodHandles.lookup().lookupClass().getSimpleName());
    }

}

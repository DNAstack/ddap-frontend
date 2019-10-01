package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.TestingPersona;
import com.dnastack.ddap.common.page.AdminDdapPage;
import org.junit.BeforeClass;

import java.io.IOException;
import java.lang.invoke.MethodHandles;

import static com.dnastack.ddap.common.TestingPersona.ADMINISTRATOR;

public abstract class AbstractAdminFrontendE2eTest extends AbstractFrontendE2eTest {

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        String realm = getRealm();
        String testConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        setupRealmConfig(TestingPersona.ADMINISTRATOR, testConfig, "1", realm);

        ddapPage = doBrowserLogin(realm, ADMINISTRATOR, AdminDdapPage::new);
    }

    private static String getRealm() {
        return generateRealmName(MethodHandles.lookup().lookupClass().getSimpleName());
    }

}

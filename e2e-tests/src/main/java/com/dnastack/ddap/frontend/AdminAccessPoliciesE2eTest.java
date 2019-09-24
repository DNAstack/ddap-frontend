package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.AdminListPage;
import com.dnastack.ddap.common.page.AdminManagePage;
import org.junit.Test;

import static com.dnastack.ddap.common.fragments.NavBar.damPoliciesLink;

@SuppressWarnings("Duplicates")
public class AdminAccessPoliciesE2eTest extends AbstractAdminFrontendE2eTest {

    @Test
    public void addPolicy() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damPoliciesLink(DAM_ID));

        adminListPage.assertListItemDoNotExist("Bona Fide TEST");

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("id-field"), "bona_fide_test");
        adminManagePage.clearField(DdapBy.se("item-editor"));
        adminManagePage.fillField(DdapBy.se("item-editor"), loadTemplate("/com/dnastack/ddap/policies/bonaFideCustom.json"));

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists("Bona Fide TEST");
    }

}

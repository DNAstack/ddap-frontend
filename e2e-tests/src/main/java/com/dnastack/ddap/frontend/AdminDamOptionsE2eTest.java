package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.page.AdminOptionPage;
import org.junit.Test;

import static com.dnastack.ddap.common.fragments.NavBar.damOptionsLink;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasItem;

@SuppressWarnings("Duplicates")
public class AdminDamOptionsE2eTest extends AbstractAdminFrontendE2eTest {

    @Test
    public void submitBooleanOptionWronglyWithTypeError() {
        AdminOptionPage adminListPage = ddapPage.getNavBar()
                                                .goToAdminOptionPage(damOptionsLink(DAM_ID));

        assertThat(adminListPage.getOptionNames(), hasItem("Read Only Master Realm"));
        adminListPage.submitOption("Read Only Master Realm", "foobar");
        adminListPage.assertError("Read Only Master Realm", 5, containsString("boolean"));
    }

    @Test
    public void submitBooleanOptionWithoutTypeError() {
        AdminOptionPage adminListPage = ddapPage.getNavBar()
                                                .goToAdminOptionPage(damOptionsLink(DAM_ID));

        assertThat(adminListPage.getOptionNames(), hasItem("Read Only Master Realm"));
        final String oldValue = adminListPage.getOptionValue("Read Only Master Realm");
        adminListPage.submitOption("Read Only Master Realm", oldValue);
        adminListPage.assertNoError("Read Only Master Realm", 5);
    }

    @Test
    public void submitNumberOptionWithoutTypeError() {
        AdminOptionPage adminListPage = ddapPage.getNavBar()
                                                .goToAdminOptionPage(damOptionsLink(DAM_ID));

        assertThat(adminListPage.getOptionNames(), hasItem("GCP Managed Keys Per Account"));
        final String oldValue = adminListPage.getOptionValue("GCP Managed Keys Per Account");
        adminListPage.submitOption("GCP Managed Keys Per Account", oldValue);
        adminListPage.assertNoError("GCP Managed Keys Per Account", 5);
    }

    @Test
    public void submitStringOptionWithoutTypeError() {
        AdminOptionPage adminListPage = ddapPage.getNavBar()
                                                .goToAdminOptionPage(damOptionsLink(DAM_ID));

        assertThat(adminListPage.getOptionNames(), hasItem("GCP Service Account Project"));
        final String oldValue = adminListPage.getOptionValue("GCP Service Account Project");
        adminListPage.submitOption("GCP Service Account Project", oldValue);
        adminListPage.assertNoError("GCP Service Account Project", 5);
    }
}

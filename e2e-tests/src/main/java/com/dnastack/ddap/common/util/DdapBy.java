package com.dnastack.ddap.common.util;

import org.openqa.selenium.By;

public class DdapBy {
    public static By se(String selector) {
        return By.xpath(".//*[@data-se = '" + selector + "']");
    }

    public static By seAndText(String selector, String text) {
        return By.xpath(".//*[@data-se = '" + selector + "' and contains(text(), '" + text + "')]");
    }

    public static By text(String text) {
        return By.xpath("//*[contains(text(), '" + text + "')]");
    }

    public static By text(String text, String selector) {
        return By.xpath("//" + selector + "[contains(text(), '" + text + "')]");
    }
}

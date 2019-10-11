package com.dnastack.ddap.common.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.lang.String.format;

public class WebDriverUtil {
    private static final Pattern URL_PARSE_PATTERN = Pattern.compile("^(https?)://(.*)$");

    public static String getUrlWithBasicCredentials(String original, String username, String password) {
        final Matcher matcher = URL_PARSE_PATTERN.matcher(original);
        if (username != null && password != null) {
            if (matcher.find()) {
                return format("%s://%s:%s@%s", matcher.group(1), username, password, matcher.group(2));

            } else {
                throw new IllegalArgumentException("Could not parse url: " + original);
            }
        } else {
            return original;
        }
    }
}

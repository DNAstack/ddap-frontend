package com.dnastack.ddap.dam.admin.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserAccess {

    private String damId;
    private Boolean isAdmin;

}

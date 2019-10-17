package com.dnastack.ddap.explore.dataset.model;

import java.util.Map;
import lombok.Data;

@Data
public class FlatViewsResponseModel {

    Map<String, FlatView> views;

}

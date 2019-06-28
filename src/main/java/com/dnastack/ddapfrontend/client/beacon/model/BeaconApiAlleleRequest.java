package com.dnastack.ddapfrontend.client.beacon.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@Data
public class BeaconApiAlleleRequest {

    @NotBlank
    @Pattern(regexp = "[1-9]{1}|1[0-9]{1}|2[0-2]{1}|X{1}|Y{1}|MT{1}")
    private String referenceName;
    @NotBlank
    @Pattern(regexp = "[ACGT]*")
    private String referenceBases;
    @Pattern(regexp = "N|[ACGT]*")
    private String alternateBases;
    @Pattern(regexp = "DEL|INS|DUP|INV|CNV|DUP:TANDEM|DEL:ME|INS:ME")
    private String variantType;
    private String assemblyId;
    @PositiveOrZero
    private Long start;
    @PositiveOrZero
    private Long end;
    @PositiveOrZero
    private Long startMin;
    @PositiveOrZero
    private Long startMax;
    @PositiveOrZero
    private Long endMin;
    @PositiveOrZero
    private Long endMax;
    private BeaconApiIncludeDatasetResponseType includeDatasetResponses;
    private List<String> datasetIds;

}

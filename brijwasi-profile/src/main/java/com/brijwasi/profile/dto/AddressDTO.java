package com.brijwasi.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO for Address
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDTO {
    private Long id;
    private String label;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String mobileNumber;
    private String landmark;
    private Boolean isDefault;
    private Boolean isActive;
}

/**
 * DTO for Address Request
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
class AddressRequest {
    private String label;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String mobileNumber;
    private String landmark;
    private Boolean isDefault;
}

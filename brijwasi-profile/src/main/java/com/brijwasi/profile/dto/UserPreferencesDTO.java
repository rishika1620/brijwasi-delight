package com.brijwasi.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for User Preferences
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPreferencesDTO {
    private Long id;
    private Boolean emailNotifications;
    private Boolean smsNotifications;
    private Boolean pushNotifications;
    private Boolean promotionalEmails;
    private String preferredLanguage;
    private String preferredCurrency;
    private Boolean isVegetarian;
    private Boolean isSpicyFoodLover;
    private String dietaryRestrictions;
    private Boolean newsLetterSubscribed;
}

/**
 * DTO for User Preferences Request
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
class UserPreferencesRequest {
    private Boolean emailNotifications;
    private Boolean smsNotifications;
    private Boolean pushNotifications;
    private Boolean promotionalEmails;
    private String preferredLanguage;
    private String preferredCurrency;
    private Boolean isVegetarian;
    private Boolean isSpicyFoodLover;
    private String dietaryRestrictions;
    private Boolean newsLetterSubscribed;
}

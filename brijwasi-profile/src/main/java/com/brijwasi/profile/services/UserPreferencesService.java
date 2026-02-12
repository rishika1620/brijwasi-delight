package com.brijwasi.profile.services;

import com.brijwasi.profile.dtos.UserPreferencesDTO;
import com.brijwasi.profile.dtos.UserPreferencesRequest;

import java.util.Optional;

public interface UserPreferencesService {
    /**
     * Get user preferences
     */
    Optional<UserPreferencesDTO> getUserPreferences(Long userId);

    /**
     * Create user preferences with default values
     */
    UserPreferencesDTO createUserPreferences(Long userId);

    /**
     * Update user preferences
     */
    UserPreferencesDTO updateUserPreferences(Long userId, UserPreferencesRequest request);
}

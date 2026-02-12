package com.brijwasi.profile.controllers;

import com.brijwasi.profile.dtos.UserPreferencesDTO;
import com.brijwasi.profile.dtos.UserPreferencesRequest;
import com.brijwasi.profile.services.UserPreferencesService;
import com.brijwasi.profile.utils.StandardizedApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/profile/preferences")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserPreferencesController {

    private final UserPreferencesService userPreferencesService;

    public UserPreferencesController(UserPreferencesService userPreferencesService) {
        this.userPreferencesService = userPreferencesService;
    }

    /**
     * Get user preferences
     */
    @GetMapping
    public ResponseEntity<StandardizedApiResponse<UserPreferencesDTO>> getUserPreferences(
            @RequestHeader("X-User-Id") Long userId) {
        return userPreferencesService.getUserPreferences(userId)
                .map(preferences -> ResponseEntity.ok(
                        new StandardizedApiResponse<>(
                                true,
                                "User preferences retrieved successfully",
                                preferences,
                                HttpStatus.OK.value()
                        )
                ))
                .orElseGet(() -> {
                    // Create default preferences if not exists
                    UserPreferencesDTO preferences = userPreferencesService.createUserPreferences(userId);
                    return ResponseEntity.ok(
                            new StandardizedApiResponse<>(
                                    true,
                                    "Default preferences created and retrieved",
                                    preferences,
                                    HttpStatus.OK.value()
                            )
                    );
                });
    }

    /**
     * Update user preferences
     */
    @PutMapping
    public ResponseEntity<StandardizedApiResponse<UserPreferencesDTO>> updateUserPreferences(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody UserPreferencesRequest request) {
        UserPreferencesDTO preferences = userPreferencesService.updateUserPreferences(userId, request);
        return ResponseEntity.ok(
                new StandardizedApiResponse<>(
                        true,
                        "User preferences updated successfully",
                        preferences,
                        HttpStatus.OK.value()
                )
        );
    }
}

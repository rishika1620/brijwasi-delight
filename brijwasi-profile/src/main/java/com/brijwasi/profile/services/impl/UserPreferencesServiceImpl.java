package com.brijwasi.profile.services.impl;

import com.brijwasi.profile.dtos.UserPreferencesDTO;
import com.brijwasi.profile.dtos.UserPreferencesRequest;
import com.brijwasi.profile.models.UserPreferences;
import com.brijwasi.profile.repositories.UserPreferencesRepository;
import com.brijwasi.profile.services.UserPreferencesService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class UserPreferencesServiceImpl implements UserPreferencesService {

    private final UserPreferencesRepository userPreferencesRepository;

    public UserPreferencesServiceImpl(UserPreferencesRepository userPreferencesRepository) {
        this.userPreferencesRepository = userPreferencesRepository;
    }

    @Override
    public Optional<UserPreferencesDTO> getUserPreferences(Long userId) {
        return userPreferencesRepository.findByUserId(userId)
                .map(this::convertToDTO);
    }

    @Override
    public UserPreferencesDTO createUserPreferences(Long userId) {
        UserPreferences preferences = new UserPreferences();
        preferences.setUserId(userId);
        preferences.setEmailNotifications(true);
        preferences.setSmsNotifications(true);
        preferences.setPushNotifications(true);
        preferences.setPromotionalEmails(true);
        preferences.setPreferredLanguage("en");
        preferences.setPreferredCurrency("INR");
        preferences.setIsVegetarian(false);
        preferences.setIsSpicyFoodLover(true);
        preferences.setDietaryRestrictions("");
        preferences.setNewsLetterSubscribed(true);
        preferences.setCreatedAt(LocalDateTime.now());
        preferences.setUpdatedAt(LocalDateTime.now());

        return convertToDTO(userPreferencesRepository.save(preferences));
    }

    @Override
    public UserPreferencesDTO updateUserPreferences(Long userId, UserPreferencesRequest request) {
        UserPreferences preferences = userPreferencesRepository.findByUserId(userId)
                .orElseGet(() -> {
                    UserPreferences newPrefs = new UserPreferences();
                    newPrefs.setUserId(userId);
                    newPrefs.setCreatedAt(LocalDateTime.now());
                    return newPrefs;
                });

        if (request.getEmailNotifications() != null) {
            preferences.setEmailNotifications(request.getEmailNotifications());
        }
        if (request.getSmsNotifications() != null) {
            preferences.setSmsNotifications(request.getSmsNotifications());
        }
        if (request.getPushNotifications() != null) {
            preferences.setPushNotifications(request.getPushNotifications());
        }
        if (request.getPromotionalEmails() != null) {
            preferences.setPromotionalEmails(request.getPromotionalEmails());
        }
        if (request.getPreferredLanguage() != null) {
            preferences.setPreferredLanguage(request.getPreferredLanguage());
        }
        if (request.getPreferredCurrency() != null) {
            preferences.setPreferredCurrency(request.getPreferredCurrency());
        }
        if (request.getIsVegetarian() != null) {
            preferences.setIsVegetarian(request.getIsVegetarian());
        }
        if (request.getIsSpicyFoodLover() != null) {
            preferences.setIsSpicyFoodLover(request.getIsSpicyFoodLover());
        }
        if (request.getDietaryRestrictions() != null) {
            preferences.setDietaryRestrictions(request.getDietaryRestrictions());
        }
        if (request.getNewsLetterSubscribed() != null) {
            preferences.setNewsLetterSubscribed(request.getNewsLetterSubscribed());
        }

        preferences.setUpdatedAt(LocalDateTime.now());

        return convertToDTO(userPreferencesRepository.save(preferences));
    }

    private UserPreferencesDTO convertToDTO(UserPreferences preferences) {
        UserPreferencesDTO dto = new UserPreferencesDTO();
        dto.setId(preferences.getId());
        dto.setUserId(preferences.getUserId());
        dto.setEmailNotifications(preferences.getEmailNotifications());
        dto.setSmsNotifications(preferences.getSmsNotifications());
        dto.setPushNotifications(preferences.getPushNotifications());
        dto.setPromotionalEmails(preferences.getPromotionalEmails());
        dto.setPreferredLanguage(preferences.getPreferredLanguage());
        dto.setPreferredCurrency(preferences.getPreferredCurrency());
        dto.setIsVegetarian(preferences.getIsVegetarian());
        dto.setIsSpicyFoodLover(preferences.getIsSpicyFoodLover());
        dto.setDietaryRestrictions(preferences.getDietaryRestrictions());
        dto.setNewsLetterSubscribed(preferences.getNewsLetterSubscribed());
        dto.setCreatedAt(preferences.getCreatedAt());
        dto.setUpdatedAt(preferences.getUpdatedAt());
        return dto;
    }
}

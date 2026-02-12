package com.brijwasi.auth.dto;

import com.brijwasi.auth.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * DTO for user response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String mobileNumber;
    private String profileUrl;
    private Set<String> roles;

    /**
     * Convert User entity to UserDTO
     */
    public static UserDTO fromUser(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setMobileNumber(user.getMobileNumber());
        dto.setProfileUrl(user.getProfileUrl());
        dto.setRoles(user.getRoles().stream()
                .map(role -> role.name())
                .collect(Collectors.toSet()));
        return dto;
    }
}

package com.brijwasi.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for authentication response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private UserDTO user;
    private String refreshToken;
    private Long expiresIn;

    public AuthResponse(String token, UserDTO user) {
        this.token = token;
        this.user = user;
    }
}

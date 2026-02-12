package com.brijwasi.auth.dto;

import lombok.Data;

/**
 * Request DTO for reset password endpoint
 */
@Data
public class ResetPasswordRequest {
    private String token;
    private String newPassword;
    private String confirmPassword;
}

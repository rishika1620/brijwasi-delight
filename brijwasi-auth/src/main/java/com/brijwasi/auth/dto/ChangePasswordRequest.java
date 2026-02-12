package com.brijwasi.auth.dto;

import lombok.Data;

/**
 * Request DTO for changing password in profile
 */
@Data
public class ChangePasswordRequest {
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;
}

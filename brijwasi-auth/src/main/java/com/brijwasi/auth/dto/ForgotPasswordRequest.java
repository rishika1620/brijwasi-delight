package com.brijwasi.auth.dto;

import lombok.Data;

/**
 * Request DTO for forgot password endpoint
 */
@Data
public class ForgotPasswordRequest {
    private String mobileNumber;
}

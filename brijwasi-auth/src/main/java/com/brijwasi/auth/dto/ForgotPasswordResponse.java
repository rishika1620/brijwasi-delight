package com.brijwasi.auth.dto;

import lombok.Data;

/**
 * Response DTO for forgot password endpoint
 */
@Data
public class ForgotPasswordResponse {
    private String message;
    private String resetToken;

    public ForgotPasswordResponse(String message, String resetToken) {
        this.message = message;
        this.resetToken = resetToken;
    }
}

package com.brijwasi.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for Payment Card
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentCardDTO {
    private Long id;
    private String cardType;
    private String cardHolderName;
    private String cardNumber; // Last 4 digits
    private Integer expiryMonth;
    private Integer expiryYear;
    private String upiId;
    private Boolean isDefault;
    private Boolean isActive;
}

/**
 * DTO for Payment Card Request
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
class PaymentCardRequest {
    private String cardType; // CREDIT_CARD, DEBIT_CARD, UPI
    private String cardHolderName;
    private String cardNumber;
    private Integer expiryMonth;
    private Integer expiryYear;
    private String upiId;
    private Boolean isDefault;
}

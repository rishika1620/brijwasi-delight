package com.brijwasi.profile.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * User Payment Card Entity
 */
@Entity
@Table(name = "user_cards")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String cardType; // CREDIT_CARD, DEBIT_CARD, UPI

    @Column(nullable = false)
    private String cardHolderName;

    @Column(nullable = false)
    private String cardNumber; // Last 4 digits only for security

    @Column(nullable = false)
    private Integer expiryMonth;

    @Column(nullable = false)
    private Integer expiryYear;

    private String upiId; // For UPI payments

    @Column(nullable = false)
    private Boolean isDefault = false;

    @Column(nullable = false)
    private Boolean isActive = true;

    @Column(nullable = false, updatable = false)
    private Long createdAt = System.currentTimeMillis();

    @Column(nullable = false)
    private Long updatedAt = System.currentTimeMillis();
}

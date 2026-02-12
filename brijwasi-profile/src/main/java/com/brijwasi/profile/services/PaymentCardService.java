package com.brijwasi.profile.services;

import com.brijwasi.profile.dtos.PaymentCardDTO;
import com.brijwasi.profile.dtos.PaymentCardRequest;

import java.util.List;
import java.util.Optional;

public interface PaymentCardService {
    /**
     * Get all active payment cards for a user
     */
    List<PaymentCardDTO> getAllPaymentCards(Long userId);

    /**
     * Get a specific payment card by id and userId
     */
    Optional<PaymentCardDTO> getPaymentCardById(Long cardId, Long userId);

    /**
     * Add a new payment card for a user
     */
    PaymentCardDTO addPaymentCard(Long userId, PaymentCardRequest request);

    /**
     * Update an existing payment card
     */
    PaymentCardDTO updatePaymentCard(Long cardId, Long userId, PaymentCardRequest request);

    /**
     * Soft delete a payment card by marking it inactive
     */
    void deletePaymentCard(Long cardId, Long userId);

    /**
     * Set a payment card as default and unset other defaults
     */
    void setDefaultPaymentCard(Long cardId, Long userId);

    /**
     * Get default payment card for a user
     */
    Optional<PaymentCardDTO> getDefaultPaymentCard(Long userId);
}

package com.brijwasi.profile.controllers;

import com.brijwasi.profile.dtos.PaymentCardDTO;
import com.brijwasi.profile.dtos.PaymentCardRequest;
import com.brijwasi.profile.services.PaymentCardService;
import com.brijwasi.profile.utils.StandardizedApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/profile/payment-cards")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PaymentCardController {

    private final PaymentCardService paymentCardService;

    public PaymentCardController(PaymentCardService paymentCardService) {
        this.paymentCardService = paymentCardService;
    }

    /**
     * Get all active payment cards for the logged-in user
     */
    @GetMapping
    public ResponseEntity<StandardizedApiResponse<List<PaymentCardDTO>>> getAllPaymentCards(
            @RequestHeader("X-User-Id") Long userId) {
        List<PaymentCardDTO> cards = paymentCardService.getAllPaymentCards(userId);
        return ResponseEntity.ok(
                new StandardizedApiResponse<>(
                        true,
                        "Payment cards retrieved successfully",
                        cards,
                        HttpStatus.OK.value()
                )
        );
    }

    /**
     * Get a specific payment card by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<StandardizedApiResponse<PaymentCardDTO>> getPaymentCardById(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId) {
        return paymentCardService.getPaymentCardById(id, userId)
                .map(card -> ResponseEntity.ok(
                        new StandardizedApiResponse<>(
                                true,
                                "Payment card retrieved successfully",
                                card,
                                HttpStatus.OK.value()
                        )
                ))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new StandardizedApiResponse<>(
                                false,
                                "Payment card not found",
                                null,
                                HttpStatus.NOT_FOUND.value()
                        ))
                );
    }

    /**
     * Add a new payment card
     */
    @PostMapping
    public ResponseEntity<StandardizedApiResponse<PaymentCardDTO>> addPaymentCard(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody PaymentCardRequest request) {
        PaymentCardDTO card = paymentCardService.addPaymentCard(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new StandardizedApiResponse<>(
                        true,
                        "Payment card added successfully",
                        card,
                        HttpStatus.CREATED.value()
                ));
    }

    /**
     * Update an existing payment card
     */
    @PutMapping("/{id}")
    public ResponseEntity<StandardizedApiResponse<PaymentCardDTO>> updatePaymentCard(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody PaymentCardRequest request) {
        PaymentCardDTO card = paymentCardService.updatePaymentCard(id, userId, request);
        return ResponseEntity.ok(
                new StandardizedApiResponse<>(
                        true,
                        "Payment card updated successfully",
                        card,
                        HttpStatus.OK.value()
                )
        );
    }

    /**
     * Delete a payment card (soft delete)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<StandardizedApiResponse<Void>> deletePaymentCard(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId) {
        paymentCardService.deletePaymentCard(id, userId);
        return ResponseEntity.ok(
                new StandardizedApiResponse<>(
                        true,
                        "Payment card deleted successfully",
                        null,
                        HttpStatus.OK.value()
                )
        );
    }

    /**
     * Set a payment card as default
     */
    @PutMapping("/{id}/set-default")
    public ResponseEntity<StandardizedApiResponse<Void>> setDefaultPaymentCard(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId) {
        paymentCardService.setDefaultPaymentCard(id, userId);
        return ResponseEntity.ok(
                new StandardizedApiResponse<>(
                        true,
                        "Default payment card updated successfully",
                        null,
                        HttpStatus.OK.value()
                )
        );
    }

    /**
     * Get default payment card
     */
    @GetMapping("/default")
    public ResponseEntity<StandardizedApiResponse<PaymentCardDTO>> getDefaultPaymentCard(
            @RequestHeader("X-User-Id") Long userId) {
        return paymentCardService.getDefaultPaymentCard(userId)
                .map(card -> ResponseEntity.ok(
                        new StandardizedApiResponse<>(
                                true,
                                "Default payment card retrieved successfully",
                                card,
                                HttpStatus.OK.value()
                        )
                ))
                .orElseGet(() -> ResponseEntity.ok(
                        new StandardizedApiResponse<>(
                                false,
                                "No default payment card found",
                                null,
                                HttpStatus.OK.value()
                        )
                ));
    }
}

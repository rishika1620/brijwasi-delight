package com.brijwasi.payment.controller;

import com.brijwasi.payment.dto.ApiResponse;
import com.brijwasi.payment.model.Payment;
import com.brijwasi.payment.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Payment>> create(@RequestBody Payment payment) {
        try {
            var created = paymentService.createPayment(payment);
            return ResponseEntity.ok(ApiResponse.success(created, "Payment created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to create payment: " + e.getMessage(), 400));
        }
    }

    @PostMapping("/verify/{id}")
    public ResponseEntity<ApiResponse<Payment>> verify(@PathVariable Long id) {
        try {
            var verified = paymentService.verifyPayment(id);
            return ResponseEntity.ok(ApiResponse.success(verified, "Payment verified successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to verify payment: " + e.getMessage(), 400));
        }
    }

    @PostMapping("/refund/{id}")
    public ResponseEntity<ApiResponse<Payment>> refund(@PathVariable Long id) {
        try {
            var refunded = paymentService.refundPayment(id);
            return ResponseEntity.ok(ApiResponse.success(refunded, "Payment refunded successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to refund payment: " + e.getMessage(), 400));
        }
    }
}

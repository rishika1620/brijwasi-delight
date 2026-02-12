package com.brijwasi.payment.service;

import com.brijwasi.payment.model.Payment;

public interface PaymentService {
    Payment createPayment(Payment payment);
    Payment verifyPayment(Long id);
    Payment refundPayment(Long id);
}

package com.brijwasi.payment.service.impl;

import com.brijwasi.payment.model.Payment;
import com.brijwasi.payment.repository.PaymentRepository;
import com.brijwasi.payment.service.PaymentService;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public PaymentServiceImpl(PaymentRepository paymentRepository, KafkaTemplate<String, Object> kafkaTemplate) {
        this.paymentRepository = paymentRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public Payment createPayment(Payment payment) {
        payment.setStatus("CREATED");
        payment.setCreatedAt(LocalDateTime.now());
        var saved = paymentRepository.save(payment);
        kafkaTemplate.send("payment-events", saved);
        return saved;
    }

    @Override
    public Payment verifyPayment(Long id) {
        var p = paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("Payment not found"));
        p.setStatus("VERIFIED");
        var saved = paymentRepository.save(p);
        kafkaTemplate.send("payment-events", saved);
        return saved;
    }

    @Override
    public Payment refundPayment(Long id) {
        var p = paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("Payment not found"));
        p.setStatus("REFUNDED");
        var saved = paymentRepository.save(p);
        kafkaTemplate.send("payment-events", saved);
        return saved;
    }
}

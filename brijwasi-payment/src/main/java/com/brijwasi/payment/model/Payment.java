package com.brijwasi.payment.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long orderId;
    private String userId;
    private Double amount;
    private String status; // CREATED, VERIFIED, REFUNDED
    private LocalDateTime createdAt;
}

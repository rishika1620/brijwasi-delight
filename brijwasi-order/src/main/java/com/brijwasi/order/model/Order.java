package com.brijwasi.order.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private Double total;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private String deliveryPartnerId;
    private LocalDateTime createdAt;

    @ElementCollection
    private List<String> items; // simple representation
}

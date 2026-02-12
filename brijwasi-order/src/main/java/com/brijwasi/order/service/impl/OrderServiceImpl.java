package com.brijwasi.order.service.impl;

import com.brijwasi.order.model.Order;
import com.brijwasi.order.model.OrderStatus;
import com.brijwasi.order.repository.OrderRepository;
import com.brijwasi.order.service.OrderService;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public OrderServiceImpl(OrderRepository orderRepository, KafkaTemplate<String, Object> kafkaTemplate) {
        this.orderRepository = orderRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public Order placeOrder(String userId, Order order) {
        order.setUserId(userId);
        order.setStatus(OrderStatus.CONFIRMED);
        order.setCreatedAt(LocalDateTime.now());
        order.setDeliveryPartnerId(assignPartner());
        var saved = orderRepository.save(order);
        kafkaTemplate.send("order-events", saved);
        return saved;
    }

    private String assignPartner() {
        // stub logic
        return "partner-" + System.currentTimeMillis();
    }
}

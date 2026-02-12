package com.brijwasi.notification.listener;

import com.brijwasi.notification.model.Notification;
import com.brijwasi.notification.repository.NotificationRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class NotificationListener {

    private final NotificationRepository repository;

    public NotificationListener(NotificationRepository repository) {
        this.repository = repository;
    }

    @KafkaListener(topics = "order-events", groupId = "brijwasi-notification-group")
    public void onOrderEvent(Object event) {
        // simple log and store
        Notification n = new Notification();
        n.setUserId("unknown");
        n.setMessage("Order event received: " + event.toString());
        n.setCreatedAt(LocalDateTime.now());
        repository.save(n);
        System.out.println("[Notification] Order event -> " + event);
    }

    @KafkaListener(topics = "payment-events", groupId = "brijwasi-notification-group")
    public void onPaymentEvent(Object event) {
        Notification n = new Notification();
        n.setUserId("unknown");
        n.setMessage("Payment event received: " + event.toString());
        n.setCreatedAt(LocalDateTime.now());
        repository.save(n);
        System.out.println("[Notification] Payment event -> " + event);
    }
}

package com.brijwasi.notification.controller;

import com.brijwasi.notification.dto.ApiResponse;
import com.brijwasi.notification.model.Notification;
import com.brijwasi.notification.repository.NotificationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
    private final NotificationRepository repository;

    public NotificationController(NotificationRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Notification>>> list() {
        try {
            var notifications = repository.findAll();
            return ResponseEntity.ok(ApiResponse.success(notifications, "Notifications retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to retrieve notifications: " + e.getMessage(), 400));
        }
    }
}

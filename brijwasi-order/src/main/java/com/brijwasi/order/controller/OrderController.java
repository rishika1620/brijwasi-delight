package com.brijwasi.order.controller;

import com.brijwasi.order.dto.ApiResponse;
import com.brijwasi.order.model.Order;
import com.brijwasi.order.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/place/{userId}")
    public ResponseEntity<ApiResponse<Order>> place(@PathVariable String userId, @RequestBody Order order) {
        try {
            var placed = orderService.placeOrder(userId, order);
            return ResponseEntity.ok(ApiResponse.success(placed, "Order placed successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to place order: " + e.getMessage(), 400));
        }
    }
}

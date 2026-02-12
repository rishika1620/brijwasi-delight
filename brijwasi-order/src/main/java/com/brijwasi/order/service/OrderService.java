package com.brijwasi.order.service;

import com.brijwasi.order.model.Order;

public interface OrderService {
    Order placeOrder(String userId, Order order);
}

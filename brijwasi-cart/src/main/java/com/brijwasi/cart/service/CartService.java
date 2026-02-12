package com.brijwasi.cart.service;

import com.brijwasi.cart.model.Cart;

public interface CartService {
    Cart getCart(String userId);
    Cart addItem(String userId, Long menuItemId, Integer qty, Double price);
    Cart removeItem(String userId, Long menuItemId);
    void clearCart(String userId);
}

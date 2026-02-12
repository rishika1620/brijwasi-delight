package com.brijwasi.cart.service.impl;

import com.brijwasi.cart.model.Cart;
import com.brijwasi.cart.model.CartItem;
import com.brijwasi.cart.repository.CartRepository;
import com.brijwasi.cart.service.CartService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    public CartServiceImpl(CartRepository cartRepository, RedisTemplate<String, Object> redisTemplate) {
        this.cartRepository = cartRepository;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public Cart getCart(String userId) {
        var cached = redisTemplate.opsForValue().get("cart:" + userId);
        if (cached instanceof Cart) return (Cart) cached;
        Optional<Cart> db = cartRepository.findById(userId);
        Cart cart = db.orElseGet(() -> {
            Cart c = new Cart();
            c.setUserId(userId);
            c.setItems(new ArrayList<>());
            return c;
        });
        redisTemplate.opsForValue().set("cart:" + userId, cart);
        return cart;
    }

    @Override
    public Cart addItem(String userId, Long menuItemId, Integer qty, Double price) {
        System.out.println("Rishi: adding to cart l1");
        Cart cart= new Cart();
        try{
            cart = getCart(userId);
        }catch(Exception e){
            System.out.println("Rishi: Exception in getting cart: "+ e);
        }
        List<CartItem> items = cart.getItems();
        if (items == null) items = new ArrayList<>();
        boolean found = false;
        for (CartItem it : items) {
            if (it.getMenuItemId().equals(menuItemId)) {
                it.setQuantity(it.getQuantity() + qty);
                found = true;
                break;
            }
        }
        if (!found) {
            CartItem it = new CartItem();
            it.setMenuItemId(menuItemId);
            it.setQuantity(qty);
            it.setPrice(price);
            items.add(it);
        }
        cart.setItems(items);
        redisTemplate.opsForValue().set("cart:" + userId, cart);
        cartRepository.save(cart); // backup
        return cart;
    }

    @Override
    public Cart removeItem(String userId, Long menuItemId) {
        Cart cart = getCart(userId);
        List<CartItem> items = cart.getItems();
        if (items == null) return cart;
        items.removeIf(it -> it.getMenuItemId().equals(menuItemId));
        cart.setItems(items);
        redisTemplate.opsForValue().set("cart:" + userId, cart);
        cartRepository.save(cart);
        return cart;
    }

    @Override
    public void clearCart(String userId) {
        redisTemplate.delete("cart:" + userId);
        cartRepository.deleteById(userId);
    }
}

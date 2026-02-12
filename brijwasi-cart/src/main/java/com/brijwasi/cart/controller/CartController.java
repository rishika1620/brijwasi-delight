package com.brijwasi.cart.controller;

import com.brijwasi.cart.dto.ApiResponse;
import com.brijwasi.cart.model.Cart;
import com.brijwasi.cart.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<Cart>> getCart(@PathVariable String userId) {
        try {
            var cart = cartService.getCart(userId);
            return ResponseEntity.ok(ApiResponse.success(cart, "Cart retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to retrieve cart: " + e.getMessage(), 400));
        }
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<ApiResponse<Cart>> add(@PathVariable String userId, @RequestParam Long menuItemId,
                                    @RequestParam Integer qty, @RequestParam Double price) {
        try {
            System.out.println("Rishi: adding in controller to cart");
            var cart = cartService.addItem(userId, menuItemId, qty, price);
            return ResponseEntity.ok(ApiResponse.success(cart, "Item added to cart successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to add item to cart: " + e.getMessage(), 400));
        }
    }

    @PostMapping("/{userId}/remove")
    public ResponseEntity<ApiResponse<Cart>> remove(@PathVariable String userId, @RequestParam Long menuItemId) {
        try {
            var cart = cartService.removeItem(userId, menuItemId);
            return ResponseEntity.ok(ApiResponse.success(cart, "Item removed from cart successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to remove item from cart: " + e.getMessage(), 400));
        }
    }

    @PostMapping("/{userId}/clear")
    public ResponseEntity<ApiResponse<String>> clear(@PathVariable String userId) {
        try {
            cartService.clearCart(userId);
            return ResponseEntity.ok(ApiResponse.success("Cart cleared successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to clear cart: " + e.getMessage(), 400));
        }
    }
}

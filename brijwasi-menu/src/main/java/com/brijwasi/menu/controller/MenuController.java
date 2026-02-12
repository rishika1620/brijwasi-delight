package com.brijwasi.menu.controller;

import com.brijwasi.menu.dto.ApiResponse;
import com.brijwasi.menu.model.Category;
import com.brijwasi.menu.model.MenuItem;
import com.brijwasi.menu.service.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class MenuController {
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    // Public
    @GetMapping("/menu/categories")
    public ResponseEntity<ApiResponse<List<Category>>> categories() {
        try {
            var data = menuService.listCategories();
            return ResponseEntity.ok(ApiResponse.success(data, "Categories retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to retrieve categories: " + e.getMessage(), 400));
        }
    }

    @GetMapping("/menu/items")
    public ResponseEntity<ApiResponse<List<MenuItem>>> items(@RequestParam(required = false) Long categoryId) {
        try {
            var data = menuService.listMenuItems(categoryId);
            return ResponseEntity.ok(ApiResponse.success(data, "Menu items retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to retrieve menu items: " + e.getMessage(), 400));
        }
    }

    // Admin
    @PostMapping("/admin/categories")
    public ResponseEntity<ApiResponse<Category>> createCategory(@RequestBody Category category) {
        try {
            var created = menuService.createCategory(category);
            return ResponseEntity.ok(ApiResponse.success(created, "Category created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to create category: " + e.getMessage(), 400));
        }
    }

    @PostMapping("/admin/items")
    public ResponseEntity<ApiResponse<MenuItem>> createItem(@RequestBody MenuItem item) {
        try {
            var created = menuService.createMenuItem(item);
            return ResponseEntity.ok(ApiResponse.success(created, "Menu item created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to create menu item: " + e.getMessage(), 400));
        }
    }
}

package com.brijwasi.menu.service.impl;

import com.brijwasi.menu.model.Category;
import com.brijwasi.menu.model.MenuItem;
import com.brijwasi.menu.repository.CategoryRepository;
import com.brijwasi.menu.repository.MenuItemRepository;
import com.brijwasi.menu.service.MenuService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    private final CategoryRepository categoryRepository;
    private final MenuItemRepository menuItemRepository;

    public MenuServiceImpl(CategoryRepository categoryRepository, MenuItemRepository menuItemRepository) {
        this.categoryRepository = categoryRepository;
        this.menuItemRepository = menuItemRepository;
    }

    @Override
    public Category createCategory(Category category) {
        category.getItems().forEach(item -> item.setCategory(category));
        return categoryRepository.save(category);
    }

    @Override
    public MenuItem createMenuItem(MenuItem item) {
        return menuItemRepository.save(item);
    }

    @Override
    public List<Category> listCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public List<MenuItem> listMenuItems(Long categoryId) {
        if (categoryId == null) return menuItemRepository.findAll();
        return menuItemRepository.findByCategoryId(categoryId);
    }
}

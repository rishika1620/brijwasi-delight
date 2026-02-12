package com.brijwasi.menu.service;

import com.brijwasi.menu.model.Category;
import com.brijwasi.menu.model.MenuItem;

import java.util.List;

public interface MenuService {
    Category createCategory(Category category);
    MenuItem createMenuItem(MenuItem item);
    List<Category> listCategories();
    List<MenuItem> listMenuItems(Long categoryId);
}

package com.fixify.service;

import java.util.List;

import com.fixify.dto.CategoryDTO;
import com.fixify.entity.Category;

public interface CategoryService { 

	List<Category> getAllCategorie();
	Category addCategory(Category category);
}

package com.fixify.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.dto.CategoryDTO;
import com.fixify.entity.Category;
import com.fixify.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService{

	private final CategoryRepository categoryRepository;
	
	@Override
	public List<Category> getAllCategorie() {
		// TODO Auto-generated method stub
		return categoryRepository.findAll();
	}

	@Override
	public Category addCategory(Category category) {
        if (categoryRepository.existsByCategoryId(category.getCategoryId())) {
            throw new RuntimeException("Category ID already exists");
        }

//        Category cat = new Category();
//        category.setName(category.getName());
//        category.setCategoryId(category.getCategoryId());
        return categoryRepository.save(category);
    }

}

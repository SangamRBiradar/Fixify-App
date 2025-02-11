package com.fixify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	Category findByCategoryId(String id);
	boolean existsByCategoryId(String categoryId);
}

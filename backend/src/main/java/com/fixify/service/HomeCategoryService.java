package com.fixify.service;

import java.util.List;

import com.fixify.entity.HomeCategory;

public interface HomeCategoryService {
	HomeCategory createHomeCategory(HomeCategory homeCategory);
	List<HomeCategory> createCategories(List<HomeCategory> homeCategory);
	HomeCategory updateHomeCategory(HomeCategory homeCategory,Long id) throws Exception;
	List<HomeCategory> getAllCategories();

}

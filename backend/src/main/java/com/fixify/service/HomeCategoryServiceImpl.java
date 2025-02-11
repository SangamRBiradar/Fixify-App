package com.fixify.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.entity.HomeCategory;
import com.fixify.repository.HomeCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class HomeCategoryServiceImpl implements HomeCategoryService{
	
	private final HomeCategoryRepository homeCategoryRepository;
	
	@Override
	public HomeCategory createHomeCategory(HomeCategory homeCategory) {
				
		return homeCategoryRepository.save(homeCategory);
	}

	@Override
	public List<HomeCategory> createCategories(List<HomeCategory> homeCategories) {
		// TODO Auto-generated method stub
		
		if(homeCategoryRepository.findAll().isEmpty()) {
			return homeCategoryRepository.saveAll(homeCategories);
		}
		return homeCategoryRepository.findAll();
	}

	@Override
	public HomeCategory updateHomeCategory(HomeCategory homeCategory, Long id) throws Exception {
		  HomeCategory existingCategory = homeCategoryRepository.findById(id)
	                .orElseThrow(() -> new Exception("Category not found"));
	        if(homeCategory.getImage()!=null){
	            existingCategory.setImage(homeCategory.getImage());
	        }
	        if(homeCategory.getCategoryId()!=null){
	            existingCategory.setCategoryId(homeCategory.getCategoryId());
	        }
	        return homeCategoryRepository.save(existingCategory);
	}

	@Override
	public List<HomeCategory> getAllCategories() {
		// TODO Auto-generated method stub
		return homeCategoryRepository.findAll();
	}
	
	
}

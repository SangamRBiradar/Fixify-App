package com.fixify.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.dto.CategoryDTO;
import com.fixify.entity.Category;
import com.fixify.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {
	
	
	
	private final CategoryService categoryService;

	@GetMapping()
    public ResponseEntity<List<Category>> getHomeCategory(
          ) throws Exception {

        List<Category> categories=categoryService.getAllCategorie();
        return ResponseEntity.ok(categories);

    }
	
	
	 @PostMapping("/add")
	    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
	        Category savedCategory = categoryService.addCategory(category);
	        return ResponseEntity.ok(savedCategory);
	    }

}

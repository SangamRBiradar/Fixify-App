
package com.fixify.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.entity.Home;
import com.fixify.entity.HomeCategory;
import com.fixify.service.HomeCategoryService;
import com.fixify.service.HomeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class HomeCategoryController {

	private final HomeCategoryService homeCategoryService;
	private HomeService homeService;
	
	@PostMapping("/home-categories")
    public ResponseEntity<?> createHomeCategories(
            @RequestBody List<HomeCategory> homeCategories
    ) {
        List<HomeCategory> categories = homeCategoryService.createCategories(homeCategories);
//        Home home=homeService.creatHomePageData(categories);
        return new ResponseEntity<>(categories, HttpStatus.ACCEPTED);
    }
}

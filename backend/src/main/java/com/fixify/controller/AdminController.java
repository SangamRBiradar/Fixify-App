package com.fixify.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.entity.AccountStatus;
import com.fixify.entity.Category;
import com.fixify.entity.HomeCategory;
import com.fixify.entity.Vendor;
import com.fixify.service.CategoryService;
import com.fixify.service.HomeCategoryService;
import com.fixify.service.VendorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final VendorService vendorService;
    private final HomeCategoryService homeCategoryService;
    private final CategoryService categoryService;


    @PatchMapping("/vendor/{id}/status/{status}")
    public ResponseEntity<Vendor> updateSellerStatus(
            @PathVariable Long id,
            @PathVariable AccountStatus status) throws Exception {

        Vendor updatedSeller = vendorService.updateVendorAccountStatus(id,status);
        return ResponseEntity.ok(updatedSeller);

    }

//    @GetMapping("/home-category")
//    public ResponseEntity<List<HomeCategory>> getHomeCategory(
//          ) throws Exception {
//
//        List<HomeCategory> categories=homeCategoryService.getAllCategories();
//        return ResponseEntity.ok(categories);
//
//    }
    
    @GetMapping("/home-category")
    public ResponseEntity<List<Category>> getHomeCategory(
          ) throws Exception {

        List<Category> categories=categoryService.getAllCategorie();
        return ResponseEntity.ok(categories);

    }

    @PatchMapping("/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(
            @PathVariable Long id,
            @RequestBody HomeCategory homeCategory) throws Exception {

        HomeCategory updatedCategory=homeCategoryService.updateHomeCategory(homeCategory,id);
        return ResponseEntity.ok(updatedCategory);

    }
}


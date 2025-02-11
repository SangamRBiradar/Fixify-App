package com.fixify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.HomeCategory;

public interface HomeCategoryRepository extends JpaRepository<HomeCategory,Long> {

}

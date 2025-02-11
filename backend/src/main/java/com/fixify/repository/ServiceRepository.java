package com.fixify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fixify.entity.Category;
import com.fixify.entity.Service;

public interface ServiceRepository extends JpaRepository<Service, Long>{

	List<Service> findByCategory(Category category);

	List<Service> findByVendorId(Long id);
	
	List<Service> findByCategory_CategoryId(String category);
	
	
	@Query("SELECT p FROM Service p WHERE (:query IS NULL OR LOWER(p.title) " +
            "LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "OR (:query IS NULL OR LOWER(p.category.name) " +
            "LIKE LOWER(CONCAT('%', :query, '%')))"+
            "OR (:query IS NULL OR LOWER(p.category.categoryId) " +
            "LIKE LOWER(CONCAT('%', :query, '%')))"
    )
	List<Service> searchService(@Param("query") String query );

}

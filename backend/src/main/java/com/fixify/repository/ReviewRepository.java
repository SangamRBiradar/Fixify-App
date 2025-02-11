package com.fixify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	
	List<Review> findByServiceId(Long serviceId);
	

}

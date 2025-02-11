package com.fixify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	List<Order> findByUserId(Long userId);
//	List<Order> findByVendorID(Long vendorId);

	List<Order> findByVendorId(Long vendorId);

}

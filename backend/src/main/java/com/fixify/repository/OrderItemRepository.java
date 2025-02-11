package com.fixify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

}

package com.fixify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.Cart;

public interface CartRepository  extends JpaRepository<Cart,Long>{

	Cart findByUserId(Long id);
}

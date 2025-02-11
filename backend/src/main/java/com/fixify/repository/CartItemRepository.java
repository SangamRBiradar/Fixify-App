package com.fixify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.Cart;
import com.fixify.entity.CartItem;
import com.fixify.entity.Service;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

	CartItem findByCartAndServiceAndSize(Cart cart, Service service, String size);

	
}

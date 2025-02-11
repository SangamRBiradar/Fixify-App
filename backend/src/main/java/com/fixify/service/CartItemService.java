package com.fixify.service;

import com.fixify.custom_exception.CartItemException;
import com.fixify.custom_exception.UserException;
import com.fixify.entity.CartItem;

public interface CartItemService {
	
	CartItem updateCartItem(Long userId,Long id,CartItem cartItem) throws Exception;
	void removeCartItem(Long userId,Long cartItemId) throws CartItemException, UserException;
	CartItem findCartItemById(Long id) throws CartItemException;

}

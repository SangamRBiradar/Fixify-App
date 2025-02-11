package com.fixify.service;

import com.fixify.entity.Cart;
import com.fixify.entity.CartItem;
import com.fixify.entity.Service;
import com.fixify.entity.User;

public interface CartService {
	
	public CartItem addCartItem(User user,Service service,String size,int qunatity);
	
	public Cart findUserCart(User user);

}

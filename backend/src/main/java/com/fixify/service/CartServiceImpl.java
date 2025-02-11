package com.fixify.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.entity.Cart;
import com.fixify.entity.CartItem;
import com.fixify.entity.User;
import com.fixify.repository.CartItemRepository;
import com.fixify.repository.CartRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

	private final CartRepository cartRepository;
	private final CartItemRepository cartItemRepository;

	@Override
	public CartItem addCartItem(User user, com.fixify.entity.Service service, String size, int quantity) {
		// TODO Auto-generated method stub
//		service.getImages().size();
		Cart cart = findUserCart(user);
		
		CartItem isPresent = cartItemRepository.findByCartAndServiceAndSize(cart, service, size);

		if(isPresent == null) {
			CartItem cartItem = new CartItem();
			cartItem.setService(service);

			cartItem.setQuantity(quantity);
			cartItem.setUserId(user.getId());
			
			int totalPrice=quantity*service.getSellingPrice();
			cartItem.setSellingPrice(totalPrice);
			cartItem.setMrpPrice(quantity*service.getMrpPrice());
			cartItem.setSize(size);
			
			

			cart.getCartItems().add(cartItem);
			cartItem.setCart(cart);

            return cartItemRepository.save(cartItem);
		}

		return isPresent;
		
		
	}

	@Override
	public Cart findUserCart(User user) {
		// TODO Auto-generated method stub
		Cart cart = cartRepository.findByUserId(user.getId());

		int totalPrice = 0;
		int totalDiscountedPrice = 0;
		int totalItem = 0;

		for (CartItem cartsItem : cart.getCartItems()) {
			totalPrice += cartsItem.getMrpPrice();
			totalDiscountedPrice += cartsItem.getSellingPrice();
			totalItem += cartsItem.getQuantity();
		}

		cart.setTotalMrpPrice(totalPrice);
		cart.setTotalItem(cart.getCartItems().size());
		cart.setTotalSellingPrice(totalDiscountedPrice);
		cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountedPrice));
		cart.setTotalItem(totalItem);

		return cartRepository.save(cart);

	}

	public static int calculateDiscountPercentage(double mrpPrice, double sellingPrice) {
		if (mrpPrice <= 0) {
			return 0;
		}
		double discount = mrpPrice - sellingPrice;
		double discountPercentage = (discount / mrpPrice) * 100;
		return (int) discountPercentage;
	}

}

package com.fixify.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.custom_exception.CartItemException;
import com.fixify.custom_exception.UserException;
import com.fixify.entity.CartItem;
import com.fixify.entity.User;
import com.fixify.repository.CartItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

	
	private final CartItemRepository cartItemRepository;
	
	@Override
	public CartItem updateCartItem(Long userId,
			Long id, CartItem cartItem) throws CartItemException
			{
		
		CartItem item=findCartItemById(id);
		User cartItemUser=item.getCart().getUser();
		
		if(cartItemUser.getId().equals(userId)) {
			
			item.setQuantity(cartItem.getQuantity());
			item.setMrpPrice(item.getQuantity()*item.getService().getMrpPrice());
			item.setSellingPrice(item.getQuantity()*item.getService().getSellingPrice());
			
			return cartItemRepository.save(item);
				
			
		}
		else {
			throw new CartItemException("You can't update  another users cart_item");
		}
		
	}


	@Override
	public void removeCartItem(Long userId,Long cartItemId)
			throws CartItemException,
			UserException {
		
		System.out.println("userId- "+userId+" cartItemId "+cartItemId);
		
		CartItem cartItem=findCartItemById(cartItemId);
		
		User cartItemUser=cartItem.getCart().getUser();

		if(cartItemUser.getId().equals(userId)) {
			cartItemRepository.deleteById(cartItem.getId());
		}
		else {
			throw new UserException("you can't remove anothor users item");
		}
		
	}

	@Override
	public CartItem findCartItemById(Long cartItemId) throws CartItemException {
		Optional<CartItem> opt=cartItemRepository.findById(cartItemId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new CartItemException("cartItem not found with id : "+cartItemId);
	}

}

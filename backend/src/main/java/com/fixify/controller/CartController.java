package com.fixify.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.dto.AddItemRequest;
import com.fixify.dto.ApiResponse;
import com.fixify.entity.Cart;
import com.fixify.entity.CartItem;
import com.fixify.entity.User;
import com.fixify.service.CartItemService;
import com.fixify.service.CartService;
import com.fixify.service.Servicesservice;
import com.fixify.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {
	
	private final CartService cartService;
	private final UserService userService;
	private final Servicesservice serService;
	private final CartItemService cartItemService;
	
	
	@GetMapping()
	public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user=userService.findUserByJwtToken(jwt);
		
		Cart cart=cartService.findUserCart(user);
		
		System.out.println("cart - "+cart.getUser().getEmail());
		
		return new ResponseEntity<Cart>(cart,HttpStatus.OK);
	}
	
	@PutMapping("/add")
	public ResponseEntity<CartItem> addItemToCart(@RequestBody AddItemRequest req,
												  @RequestHeader("Authorization") String jwt) throws Exception{
		
		User user=userService.findUserByJwtToken(jwt);
		com.fixify.entity.Service service =serService.findServiceById(req.getServiceId());
		
		CartItem item = cartService.addCartItem(user,
				service,
				req.getSize(),
				req.getQuantity());
		

		return new ResponseEntity<>(item,HttpStatus.ACCEPTED);
		
	}

	@DeleteMapping("/item/{cartItemId}")
	public ResponseEntity<ApiResponse> deleteCartItemHandler(
			@PathVariable Long cartItemId,
			@RequestHeader("Authorization")String jwt)
			throws Exception{

		User user=userService.findUserByJwtToken(jwt);
		cartItemService.removeCartItem(user.getId(), cartItemId);

		ApiResponse res=new ApiResponse();
		res.setMessage("Item Remove From Cart");

		return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
	}

	@PutMapping("/item/{cartItemId}")
	public ResponseEntity<CartItem> updateCartItemHandler(
			@PathVariable Long cartItemId,
			@RequestBody CartItem cartItem,
			@RequestHeader("Authorization")String jwt)
			throws Exception{

		User user=userService.findUserByJwtToken(jwt);

		CartItem updatedCartItem = null;
		if(cartItem.getQuantity()>0){
			updatedCartItem=cartItemService.updateCartItem(user.getId(),
					cartItemId, cartItem);
		}
	



		return new ResponseEntity<>(updatedCartItem,HttpStatus.ACCEPTED);
	}
	



}

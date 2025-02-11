package com.fixify.controller;

import java.lang.reflect.Array;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.custom_exception.OrderException;
import com.fixify.dto.ApiResponse;
import com.fixify.entity.Order;
import com.fixify.entity.OrderStatus;
import com.fixify.entity.Vendor;
import com.fixify.service.OrderService;
import com.fixify.service.VendorService;

import io.jsonwebtoken.lang.Arrays;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vendor/orders")
public class VendorOrderController {

	
	private final OrderService orderService;
	private final VendorService vendorService;
	
	
	 @GetMapping()
	    public ResponseEntity<List<Order>> getAllOrdersHandler(
	            @RequestHeader("Authorization") String jwt
	    ) throws Exception {
	        Vendor vendor=vendorService.getVendorProfile(jwt);
	        System.out.println("vendor id: "+vendor.getId());
	        List<Order> orders=orderService.vendorsOrder(vendor.getId());
	        
	        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
	    }

	    @PatchMapping("/{orderId}/status/{orderStatus}")
	    public ResponseEntity<Order> updateOrderHandler(
	            @RequestHeader("Authorization") String jwt,
	            @PathVariable Long orderId,
	            @PathVariable OrderStatus orderStatus
	    ) throws Exception {

	        Order orders=orderService.updateOrderStatus(orderId,orderStatus);

	        return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	    }


	    @DeleteMapping("/{orderId}/delete")
	    public ResponseEntity<ApiResponse> deleteOrderHandler(@PathVariable Long orderId,
	                                                          @RequestHeader("Authorization") String jwt) throws OrderException{
	        orderService.deleteOrder(orderId);
	        ApiResponse res=new ApiResponse("Order Deleted Successfully",true);
	        System.out.println("delete method working....");
	        return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
	    }
	    
}

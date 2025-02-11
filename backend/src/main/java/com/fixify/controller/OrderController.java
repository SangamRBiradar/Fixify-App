package com.fixify.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.dto.PaymentLinkResponse;
import com.fixify.entity.Address;
import com.fixify.entity.Cart;
import com.fixify.entity.Order;
import com.fixify.entity.OrderItem;
import com.fixify.entity.PaymentMethod;
import com.fixify.entity.PaymentOrder;
import com.fixify.entity.User;
import com.fixify.repository.PaymentOrderRepository;
import com.fixify.service.CartService;
import com.fixify.service.OrderService;
import com.fixify.service.PaymentService;
import com.fixify.service.UserService;
import com.razorpay.PaymentLink;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
	
	@Autowired
	private UserService userService;
	
	private final CartService cartService;
	private final OrderService orderService;
	private final PaymentService paymentService;
	private final PaymentOrderRepository paymentOrderRepository;

	@PostMapping()
	public ResponseEntity<PaymentLinkResponse> createOrderHandler(
			@RequestBody Address shippingAddress,
			@RequestParam PaymentMethod paymentMethod,
			@RequestHeader("Authorization")String jwt)
            throws Exception{
		
		System.out.println(paymentMethod);
		User user=userService.findUserByJwtToken(jwt);
		Cart cart=cartService.findUserCart(user);
		Set<Order> orders =orderService.createOrder(user, shippingAddress,cart);

		PaymentOrder paymentOrder=paymentService.createOrder(user,orders);

		PaymentLinkResponse res = new PaymentLinkResponse();

		if(paymentMethod.equals(PaymentMethod.RAZORPAY)){
			PaymentLink payment=paymentService.createRazorpayPaymentLink(user,
					paymentOrder.getAmount(),
					paymentOrder.getId());
			String paymentUrl=payment.get("short_url");
			String paymentUrlId=payment.get("id");

			paymentOrder.setPaymentMethod(PaymentMethod.RAZORPAY);
			res.setPayment_link_url(paymentUrl);
//			res.setPayment_link_id(paymentUrlId);
			paymentOrder.setPaymentLinkId(paymentUrlId);
			paymentOrderRepository.save(paymentOrder);
		}
//		else{
//			String paymentUrl=paymentService.createStripePaymentLink(user,
//					paymentOrder.getAmount(),
//					paymentOrder.getId());
//			res.setPayment_link_url(paymentUrl);
//		}
		return new ResponseEntity<>(res,HttpStatus.OK);

		
		
		
	}
	
	
	@GetMapping("/user")
	public ResponseEntity< List<Order>> usersOrderHistoryHandler(
			@RequestHeader("Authorization")
	String jwt) throws Exception{
		
		User user=userService.findUserByJwtToken(jwt);
		List<Order> orders=orderService.userOrderHistory(user.getId());
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity< Order> getOrderById(@PathVariable Long orderId, @RequestHeader("Authorization")
	String jwt) throws Exception{
		
		User user = userService.findUserByJwtToken(jwt);
		Order orders=orderService.findOrderById(orderId);
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}

	@GetMapping("/item/{orderItemId}")
	public ResponseEntity<OrderItem> getOrderItemById(
			@PathVariable Long orderItemId, @RequestHeader("Authorization")
	String jwt) throws Exception {
		System.out.println("------- controller ");
		User user = userService.findUserByJwtToken(jwt);
		OrderItem orderItem=orderService.getOrderItemById(orderItemId);
		return new ResponseEntity<>(orderItem,HttpStatus.ACCEPTED);
	}

	
	//for cancelling order
	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<Order> cancelOrder(
			@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt
	) throws Exception {
		User user=userService.findUserByJwtToken(jwt);
		Order order=orderService.cancelOrder(orderId,user);

//		Seller seller= sellerService.getSellerById(order.getSellerId());
//		SellerReport report=sellerReportService.getSellerReport(seller);
//
//		report.setCanceledOrders(report.getCanceledOrders()+1);
//		report.setTotalRefunds(report.getTotalRefunds()+order.getTotalSellingPrice());
//		sellerReportService.updateSellerReport(report);

		return ResponseEntity.ok(order);
	}

	
	

}

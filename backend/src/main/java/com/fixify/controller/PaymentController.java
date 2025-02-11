package com.fixify.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.dto.ApiResponse;
import com.fixify.dto.PaymentLinkResponse;
import com.fixify.entity.Cart;
import com.fixify.entity.Order;
import com.fixify.entity.PaymentOrder;
import com.fixify.entity.User;
import com.fixify.entity.Vendor;
import com.fixify.entity.VendorSellReport;
import com.fixify.repository.CartRepository;
import com.fixify.service.PaymentService;
import com.fixify.service.UserService;
import com.fixify.service.VendorReportService;
import com.fixify.service.VendorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {

	private UserService userService;
	private PaymentService paymentService;
	private Object transactionService;
	private VendorService vendorService;
	private VendorReportService vendorReportService;
	private CartRepository cartRepository;
	

	@GetMapping("/{paymentId}")
	public ResponseEntity<ApiResponse> paymentSuccessHandler(@PathVariable String paymentId,
			@RequestParam String paymentLinkId, @RequestHeader("Authorization") String jwt) throws Exception {

		User user = userService.findUserByJwtToken(jwt);

		PaymentLinkResponse paymentResponse;

		PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);

		boolean paymentSuccess = paymentService.ProceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);
		if (paymentSuccess) {
			for (Order order : paymentOrder.getOrders()) {
//				transactionService.createTransaction(order);
				Vendor vendor = vendorService.getVendorById(order.getVendorId());
				VendorSellReport report = vendorReportService.getVendorReport(vendor);
				report.setTotalOrders(report.getTotalOrders() + 1);
				report.setTotalEarnings(report.getTotalEarnings() + order.getTotalSellingPrice());
				report.setTotalSales(report.getTotalSales() + order.getOrderItems().size());
				vendorReportService.updateVendorReport(report);
			}
			Cart cart = cartRepository.findByUserId(user.getId());
//			cart.setCouponPrice(0);
//			cart.setCouponCode(null);
//	        Set<CartItem> items=cart.getCartItems();
//	        cartItemRepository.deleteAll(items);
//	        cart.setCartItems(new HashSet<>());
			cartRepository.save(cart);

		}

		ApiResponse res = new ApiResponse();
		res.setMessage("Payment successful");
		res.setStatus(true);

		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}
}

package com.fixify.service;

import java.util.Set;

import com.fixify.entity.Order;
import com.fixify.entity.PaymentOrder;
import com.fixify.entity.User;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;

public interface PaymentService {
	
	PaymentOrder createOrder(User user,Set<Order> orders);
	PaymentOrder getPaymentOrderById(Long orderId) throws Exception;
	PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception;
	Boolean ProceedPaymentOrder(PaymentOrder paymentOrder,String paymentId,String paymentLinkId) throws RazorpayException;
	PaymentLink createRazorpayPaymentLink(User user,Long amount,Long orderId) throws RazorpayException;

}

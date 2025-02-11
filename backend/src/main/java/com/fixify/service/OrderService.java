package com.fixify.service;

import java.util.List;
import java.util.Set;

import com.fixify.entity.Address;
import com.fixify.entity.Cart;
import com.fixify.entity.Order;
import com.fixify.entity.OrderItem;
import com.fixify.entity.OrderStatus;
import com.fixify.entity.User;

public interface OrderService {

	Set<Order> createOrder(User user,Address shippingAddress,Cart cart);
	Order findOrderById(Long id) throws Exception;
	List<Order> userOrderHistory(Long userId);
	List<Order> vendorsOrder(Long vendorId);
	Order updateOrderStatus(Long orderId,OrderStatus status) throws Exception;
	Order cancelOrder(Long orderId,User user) throws Exception;
	OrderItem getOrderItemById(Long id) throws Exception;
	void deleteOrder(Long orderId);
}

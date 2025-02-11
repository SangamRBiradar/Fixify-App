package com.fixify.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.custom_exception.OrderException;
import com.fixify.entity.Address;
import com.fixify.entity.Cart;
import com.fixify.entity.CartItem;
import com.fixify.entity.Order;
import com.fixify.entity.OrderItem;
import com.fixify.entity.OrderStatus;
import com.fixify.entity.PaymentStatus;
import com.fixify.entity.User;
import com.fixify.repository.AddressRepository;
import com.fixify.repository.OrderItemRepository;
import com.fixify.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepository;
	
	private final AddressRepository addressRepository;

	private final OrderItemRepository  orderItemRepository;
	
	@Override
	public Set<Order> createOrder(User user, Address shippAddress, Cart cart) {
		// TODO Auto-generated method stub
		if(!user.getAddresses().contains(shippAddress)){
			user.getAddresses().add(shippAddress);
		}


		Address address= addressRepository.save(shippAddress);
		
		Map<Long, List<CartItem>> itemsBySeller = cart.getCartItems().stream()
				.collect(Collectors.groupingBy(item -> item.getService().getVendor().getId()));
		
		Set<Order> orders = new HashSet<>();
		
		for(Map.Entry<Long, List<CartItem>> entry:itemsBySeller.entrySet()){
			Long sellerId=entry.getKey();
			List<CartItem> cartItems=entry.getValue();

			int totalOrderPrice = cartItems.stream()
					.mapToInt(CartItem::getSellingPrice).sum();
			int totalItem=cartItems.stream().mapToInt(CartItem::getQuantity).sum();

			Order createdOrder=new Order();
			createdOrder.setUser(user);
			createdOrder.setVendorId(sellerId);
			createdOrder.setTotalMrpPrice(totalOrderPrice);
			createdOrder.setTotalSellingPrice(totalOrderPrice);
			createdOrder.setTotalItem(totalItem);
			createdOrder.setShippingAddress(address);
			createdOrder.setOrderStatus(OrderStatus.PENDING);
			createdOrder.getPaymentDetails().setStatus(PaymentStatus.PENDING);

			Order savedOrder=orderRepository.save(createdOrder);
			orders.add(savedOrder);


			List<OrderItem> orderItems=new ArrayList<>();

			for(CartItem item: cartItems) {
				
				OrderItem orderItem=new OrderItem();

				orderItem.setOrder(savedOrder);
				orderItem.setMrpPrice(item.getMrpPrice());
				orderItem.setService(item.getService());
				orderItem.setQuantity(item.getQuantity());
//				orderItem.setSize(item.getSize());
				orderItem.setUserId(item.getUserId());
				orderItem.setSellingPrice(item.getSellingPrice());

				savedOrder.getOrderItems().add(orderItem);

				OrderItem createdOrderItem=orderItemRepository.save(orderItem);

				orderItems.add(createdOrderItem);
			}

		}
		
		return orders;
		
	}
	@Override
	public Order findOrderById(Long id) throws Exception {
		// TODO Auto-generated method stub
		return orderRepository.findById(id).orElseThrow(()-> new Exception ("Order not found"));
	}

	@Override
	public List<Order> userOrderHistory(Long userId) {
		// TODO Auto-generated method stub
		return orderRepository.findByUserId(userId);
	}

	@Override
	public List<Order> vendorsOrder(Long vendorId) {
		// TODO Auto-generated method stub
		return orderRepository.findByVendorId(vendorId);
//		return null;
	}

	@Override
	public Order updateOrderStatus(Long orderId, OrderStatus status) throws Exception {
		// TODO Auto-generated method stub
		
		Order order=findOrderById(orderId);
		order.setOrderStatus(status);
		return orderRepository.save(order);
		
	}

	@Override
	public Order cancelOrder(Long orderId, User user) throws Exception {
		Order order=findOrderById(orderId);
		
		// TODO Auto-generated method stub
		if(user.getId().equals(order.getUser().getId())){
			throw new OrderException("you can't perform this action "+orderId);
		}
		
		order.setOrderStatus(OrderStatus.CANCELLED);
		return orderRepository.save(order);
	}
	@Override
	public OrderItem getOrderItemById(Long id) throws Exception {
		// TODO Auto-generated method stub
		
		return orderItemRepository.findById(id).orElseThrow(()->new Exception("Order item not exist"));
	}
	@Override
	public void deleteOrder(Long orderId) {
		// TODO Auto-generated method stub
		
		orderItemRepository.deleteById(orderId);
		
	}
	

}

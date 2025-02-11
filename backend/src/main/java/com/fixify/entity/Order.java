package com.fixify.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	//doubt
//	@Column(unique = true, nullable = false)
	private String orderId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	
//	This field assumes that a single vendor is associated with an order. However:
//		If the Order contains items from multiple vendors, this approach won’t work.
//		The OrderItem entity already links each item to a Vendor.
//		Solution:
//
//		Remove vendorId and rely on the OrderItem entity to track vendor details.
	private Long vendorId;
	
	@OneToMany(mappedBy = "order",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
	private List<OrderItem> orderItems = new ArrayList<>();
	
	@ManyToOne
	@JoinColumn(name = "shipping_address_id")
	private Address shippingAddress;
	
	
	
	//added later as per chatgpt  to avoid extra join table
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "payment_order_id") // Foreign Key to PaymentOrder
    private PaymentOrder paymentOrder;
	
	@Embedded
	private PaymentDetails paymentDetails = new PaymentDetails();
	
	private double totalMrpPrice;
	
	private Integer totalSellingPrice;
	
	private OrderStatus orderStatus;
	
	private int totalItem;
	
	private PaymentStatus paymentStatus = PaymentStatus.PENDING;
	
	private LocalDateTime orderDate = LocalDateTime.now();
	
	private LocalDateTime delieverDate = orderDate.plusHours(7);
	
	
	


}

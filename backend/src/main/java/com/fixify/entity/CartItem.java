package com.fixify.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="cartItems")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class CartItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
//	@ManyToOne
	@JsonIgnore // 	we dont need this
	@ManyToOne
//	(fetch = FetchType.LAZY) // Link to Cart with lazy fetching
    @JoinColumn(name = "cart_id", nullable = false) 
	private Cart cart;
	
	
//	@ManyToOne
    @ManyToOne() // Link to Service with lazy fetching
    @JoinColumn(name = "service_id", nullable = false) 
	private Service service;
	
	private String size;
	
	private int quantity=1;
	
	private Integer mrpPrice;
	
	private Integer sellingPrice;
	
	private Long userId;

}

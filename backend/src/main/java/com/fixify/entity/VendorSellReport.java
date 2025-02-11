package com.fixify.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="vendorsellreport")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class VendorSellReport {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	private Vendor vendor;
	
	private Long totalEarnings = 0L;
	
	private Long totalSales = 0L;
	
	private Long totalRefunds= 0L;
	
	private Long totalTax = 0L;
	
	private Long netEarnings = 0L;
	
	private Integer totalOrders = 0;
	
	private Integer canceledOrders = 0;
	
	private Integer totalTransactions = 0;
	
	

}

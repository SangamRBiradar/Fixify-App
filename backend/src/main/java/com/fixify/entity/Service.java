package com.fixify.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
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
@Table(name="services")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Service {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	
	private int mrpPrice;
	
	private int sellingPrice;
	
	private int quantity;
	 private int discountPercent;
	
	private String description;
	
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "service_images", joinColumns = @JoinColumn(name = "service_id"))
	@Column(name = "image_url")
//	@JsonIgnore//use where need images then use dto
	private List<String> images = new ArrayList<>();
	
	private int numRatings;
	
	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
//	@JsonIgnore
	private Category category;
	
	@ManyToOne
	@JoinColumn(name = "vendor_id", nullable = false)
	private Vendor vendor;
	
	private LocalDateTime createdAt;
	
	
//	private String sizes;
	
	@OneToMany(mappedBy = "service",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
//	@JsonIgnore
	private List<Review> reviews  = new ArrayList<>();
	
	
	
	
	
	

}

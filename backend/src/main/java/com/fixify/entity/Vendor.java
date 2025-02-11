package com.fixify.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vendors")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Vendor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	
	private String vendorName;

    private String mobile;

    @Column(unique = true, nullable = false)
    private String email;
    private String password;

	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "pickup_address_id", nullable = false)
	private Address pickUpAddress = new Address();
	
	private USER_ROLE role;
	private String gstin;
	
	@Embedded
	private BankDetails bankDetails = new BankDetails();
	
	@Embedded
	private ShopDetails shopDetails = new ShopDetails();
	
	private boolean isEmailVerified=false;
	
	private AccountStatus accountStatus = AccountStatus.PENDING_VERIFICATION;
	
	

}

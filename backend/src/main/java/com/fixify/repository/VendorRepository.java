package com.fixify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.AccountStatus;
import com.fixify.entity.Vendor;
import java.util.List;


public interface VendorRepository extends JpaRepository<Vendor, Long> {
	
	Vendor findByEmail(String email);
	List<Vendor> findByAccountStatus(AccountStatus status);

}

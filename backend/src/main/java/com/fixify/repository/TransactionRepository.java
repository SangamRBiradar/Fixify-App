package com.fixify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.Transaction;
import com.fixify.entity.Vendor;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	
	List<Transaction> findByVendorId(Long vendorId);

}

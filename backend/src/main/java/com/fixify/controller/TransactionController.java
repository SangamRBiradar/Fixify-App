package com.fixify.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.entity.Order;
import com.fixify.entity.Transaction;
import com.fixify.entity.Vendor;
import com.fixify.service.TransactionService;
import com.fixify.service.VendorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionController {
	
	private final TransactionService transactionService;
	private final VendorService vendorService;
	
	 @PostMapping
	    public ResponseEntity<Transaction> createTransaction(@RequestBody Order order) {
	        Transaction transaction = transactionService.createTransaction(order);
	        return ResponseEntity.ok(transaction);
	    }

	    @GetMapping("/vendor")
	    public ResponseEntity<List<Transaction>> getTransactionByVendor(
	            @RequestHeader("Authorization") String jwt) throws Exception {
	        Vendor vendor=vendorService.getVendorProfile(jwt);

	        List<Transaction> transactions = transactionService.getTransactionByVendorId(vendor);
	        return ResponseEntity.ok(transactions);
	    }

	    @GetMapping
	    public ResponseEntity<List<Transaction>> getAllTransactions() {
	        List<Transaction> transactions = transactionService.getAllTransactions();
	        return ResponseEntity.ok(transactions);
	    }

}

package com.fixify.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.entity.Order;
import com.fixify.entity.Transaction;
import com.fixify.entity.Vendor;
import com.fixify.repository.TransactionRepository;
import com.fixify.repository.VendorRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService{

	
	private final TransactionRepository transactionRepository;
	private final VendorRepository vendorRepository;
	
	@Override
	public Transaction createTransaction(Order order) {
		// TODO Auto-generated method stub
		 Vendor vendor = vendorRepository.findById(order.getVendorId()).get();
	        Transaction transaction = new Transaction();
	        transaction.setCustomer(order.getUser());
	        transaction.setOrder(order);
	        transaction.setVendor(vendor);
	        return transactionRepository.save(transaction);
		
	}

	@Override
	public List<Transaction> getTransactionByVendorId(Vendor vendor) {
		// TODO Auto-generated method stub
		return transactionRepository.findByVendorId(vendor.getId());
	}

	@Override
	public List<Transaction> getAllTransactions() {
		// TODO Auto-generated method stub
		return transactionRepository.findAll();
	}

}

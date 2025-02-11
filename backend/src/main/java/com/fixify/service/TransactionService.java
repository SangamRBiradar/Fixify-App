package com.fixify.service;

import java.util.List;

import com.fixify.entity.Order;
import com.fixify.entity.Transaction;
import com.fixify.entity.Vendor;

public interface TransactionService {
	
	Transaction createTransaction(Order order);
	List<Transaction> getTransactionByVendorId(Vendor vendor);
	List<Transaction> getAllTransactions();

}

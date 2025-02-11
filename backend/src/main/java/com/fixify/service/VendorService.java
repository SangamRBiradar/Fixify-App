package com.fixify.service;

import java.util.List;

import com.fixify.custom_exception.VendorException;
import com.fixify.entity.AccountStatus;
import com.fixify.entity.Vendor;

public interface VendorService {
	
	Vendor getVendorProfile(String jwt) throws Exception;
	Vendor createVendor(Vendor vendor) throws Exception;
	Vendor getVendorById(Long id) throws VendorException;
	Vendor getVendorByEmail(String email)throws Exception;
	List<Vendor> getAllVendors(AccountStatus status);
	Vendor updateVendor(Long id,Vendor vendor) throws Exception;
	void deleteVendor(Long id) throws Exception;
	Vendor verifyEmail(String email,String otp) throws Exception;
	Vendor updateVendorAccountStatus(Long id,AccountStatus status) throws Exception;

}

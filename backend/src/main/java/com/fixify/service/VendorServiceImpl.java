package com.fixify.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.custom_exception.VendorException;
import com.fixify.entity.AccountStatus;
import com.fixify.entity.Address;
import com.fixify.entity.USER_ROLE;
import com.fixify.entity.Vendor;
import com.fixify.repository.AddressRepository;
import com.fixify.repository.VendorRepository;
import com.fixify.security.JwtProvider;

@Service
@Transactional
public class VendorServiceImpl implements VendorService{

	@Autowired
	private VendorRepository vendorRepository;
	
	@Autowired
	private JwtProvider jwtProvider;
	
	@Autowired 
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Override
	public Vendor getVendorProfile(String jwt) throws Exception {
		// TODO Auto-generated method stub
		
		String email = jwtProvider.getEmailFromJwtToken(jwt);
		
		return this.getVendorByEmail(email);
	}

	@Override
	public Vendor createVendor(Vendor vendor) throws Exception {
		// TODO Auto-generated method stub
		Vendor vendorExist = vendorRepository.findByEmail(vendor.getEmail());
		if(vendorExist!=null) {
			throw new Exception ("Vendor already exist , used different email");
		}
		Address savedAddress = addressRepository.save(vendor.getPickUpAddress());
		Vendor newVendor = new Vendor();
		newVendor.setEmail(vendor.getEmail());
		newVendor.setPassword(passwordEncoder.encode(vendor.getPassword()));
		newVendor.setVendorName(vendor.getVendorName());
		newVendor.setPickUpAddress(savedAddress);
		newVendor.setGstin(vendor.getGstin());
		newVendor.setRole(USER_ROLE.ROLE_VENDOR);
		newVendor.setAccountStatus(vendor.getAccountStatus());
		System.out.println(vendor.getAccountStatus());
		newVendor.setMobile(vendor.getMobile());
		newVendor.setBankDetails(vendor.getBankDetails());
		newVendor.setShopDetails(vendor.getShopDetails());		
		
		return vendorRepository.save(newVendor);
	}

	@Override
	public Vendor getVendorById(Long id) throws VendorException {
		// TODO Auto-generated method stub
		Vendor vendor = vendorRepository.findById(id).orElseThrow(()->new VendorException("Vednor not found with id"+id));
		return vendor;
	}

	@Override
	public Vendor getVendorByEmail(String email) throws Exception {
		// TODO Auto-generated method stub
		Vendor vendor = vendorRepository.findByEmail(email);
		if(vendor==null) {
			throw new Exception("Vendor not found");
		}
		return vendor;
	}

	@Override
	public List<Vendor> getAllVendors(AccountStatus status) {
		// TODO Auto-generated method stub
		
		
		return vendorRepository.findByAccountStatus(status);
	}

	@Override
	public Vendor updateVendor(Long id, Vendor vendor) throws Exception {
		// TODO Auto-generated method stub
		Vendor existingVendor = vendorRepository.findById(id).orElseThrow(()->new Exception("vendor not found"));
		
		 if (vendor.getVendorName()!= null) {
	            existingVendor.setVendorName(vendor.getVendorName());
	        }
	        if (vendor.getMobile() != null) {
	            existingVendor.setMobile(vendor.getMobile());
	        }
	        if (vendor.getEmail() != null) {
	            existingVendor.setEmail(vendor.getEmail());
	        }

	        if (vendor.getShopDetails()!= null
	                && vendor.getShopDetails().getShopName() != null
	        ) {

	            existingVendor.getShopDetails().setShopName(
	                    vendor.getShopDetails().getShopName()
	            );
	        }

	        if (vendor.getBankDetails()!= null
	                && vendor.getBankDetails().getAccountHolderName() != null
	                && vendor.getBankDetails().getIfscCode() != null
	                && vendor.getBankDetails().getAccountNumber() != null
	        ) {

	            existingVendor.getBankDetails().setAccountHolderName(
	                    vendor.getBankDetails().getAccountHolderName()
	            );
	            existingVendor.getBankDetails().setAccountNumber(
	                    vendor.getBankDetails().getAccountNumber()
	            );
	            existingVendor.getBankDetails().setIfscCode(
	                    vendor.getBankDetails().getIfscCode()
	            );
	        }
	        if (vendor.getPickUpAddress() != null
	                && vendor.getPickUpAddress() .getAddress() != null
	                && vendor.getPickUpAddress() .getMobile() != null
	                && vendor.getPickUpAddress() .getCity() != null
	                && vendor.getPickUpAddress() .getState() != null
	        ) {
	            existingVendor.getPickUpAddress()
	                    .setAddress(vendor.getPickUpAddress().getAddress());
	            existingVendor.getPickUpAddress().setCity(vendor.getPickUpAddress().getCity());
	            existingVendor.getPickUpAddress().setState(vendor.getPickUpAddress().getState());
	            existingVendor.getPickUpAddress().setMobile(vendor.getPickUpAddress().getMobile());
	            existingVendor.getPickUpAddress().setPincode(vendor.getPickUpAddress().getPincode());
	        }
	        if (vendor.getGstin() != null) {
	            existingVendor.setGstin(vendor.getGstin());
	        }


	        return vendorRepository.save(existingVendor);

		
	}

	@Override
	public void deleteVendor(Long id) throws Exception {
		// TODO Auto-generated method stub
		Vendor vendor = this.getVendorById(id);
		vendorRepository.delete(vendor);
		
	}

	@Override
	public Vendor verifyEmail(String email, String otp) throws Exception {
		// TODO Auto-generated method stub
		Vendor vendor = getVendorByEmail(email);
		vendor.setEmailVerified(true);
		
		return vendorRepository.save(vendor);
	}

	@Override
	public Vendor updateVendorAccountStatus(Long id, AccountStatus status) throws Exception {
		// TODO Auto-generated method stub
		Vendor vendor = getVendorById(id);
		vendor.setAccountStatus(status);
		return vendorRepository.save(vendor);
	}

}

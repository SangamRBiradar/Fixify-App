package com.fixify.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.custom_exception.ServiceException;
import com.fixify.dto.CreateServiceRequest;
import com.fixify.entity.Vendor;
import com.fixify.service.Servicesservice;
import com.fixify.service.UserService;
import com.fixify.service.VendorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/vendors/services")
@RequiredArgsConstructor
public class VendorServicesController {
	
	 private final Servicesservice servicesService;
	    private final VendorService vendorService;
	    private final UserService userService;


	    @GetMapping() 
	    public ResponseEntity<List<com.fixify.entity.Service>> getServiceByVendorId(
	            @RequestHeader("Authorization") String jwt) throws Exception  {

	        Vendor vendor=vendorService.getVendorProfile(jwt);

	        List<com.fixify.entity.Service> services = servicesService.getServiceByVendorId(vendor.getId());
	        return new ResponseEntity<>(services, HttpStatus.OK);

	    }
	    
	    @PostMapping
	    public ResponseEntity<com.fixify.entity.Service> createService(
	            @RequestBody CreateServiceRequest request,

	            @RequestHeader("Authorization") String jwt)
	            throws Exception {

	    	System.out.println(jwt);
	        Vendor vendor=vendorService.getVendorProfile(jwt);

	        com.fixify.entity.Service services = servicesService.createService(request, vendor);
	        return new ResponseEntity<>(services, HttpStatus.CREATED);

	    }
	    
	    @DeleteMapping("/{serviceId}")
	    public ResponseEntity<Void> deleteService(@PathVariable Long serviceId) throws Exception {
	        try {
	            servicesService.deleteService(serviceId);
	            return new ResponseEntity<>(HttpStatus.OK);
	        } catch (ServiceException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	    
	    @PatchMapping("/{serviceId}")
	    public ResponseEntity<com.fixify.entity.Service> updateService(@PathVariable Long serviceId, @RequestBody com.fixify.entity.Service service) {
	        try {
	        	com.fixify.entity.Service updatedServices = servicesService.updateService(serviceId, service);
	            return new ResponseEntity<>(updatedServices, HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
}

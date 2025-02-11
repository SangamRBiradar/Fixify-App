package com.fixify.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.entity.Category;
import com.fixify.service.Servicesservice;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/services")
public class ServicesController {
	
	 private final Servicesservice service;

	 @GetMapping("/{serviceId}")
	    public ResponseEntity<com.fixify.entity.Service> getServiceById(@PathVariable Long serviceId) throws Exception{

		 com.fixify.entity.Service ser = service.findServiceById(serviceId);
	            return new ResponseEntity<>(ser, HttpStatus.OK);

	    }

	    @GetMapping("/search")
	    public ResponseEntity<List<com.fixify.entity.Service>> searchProduct(@RequestParam(required = false) String query) {
	        List<com.fixify.entity.Service> services = service.searchService(query);
	        return new ResponseEntity<>(services, HttpStatus.OK);
	    }
	 
	 
	 
	 
	    @GetMapping("/nearby")
	    public List<com.fixify.entity.Service> getNearbyServices(
	            @RequestParam String category,
	            @RequestParam double latitude,
	            @RequestParam double longitude) {
	        return service.getServicesSortedByCategoryAndLocation(category, latitude, longitude);
	    }
	    
	    @GetMapping
	    public List<com.fixify.entity.Service> getAllServices(
	            @RequestParam String category
	            ) {
	        return service.getAllServices(category);
	    }
	    
	    @GetMapping("/all-services")
	    public List<com.fixify.entity.Service> getHomeServices( ) {
	        return service.getHomeServices();
	    }

	    
	    
}

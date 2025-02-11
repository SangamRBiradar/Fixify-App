package com.fixify.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.fixify.dto.CreateServiceRequest;
import com.fixify.entity.Category;
import com.fixify.entity.Service;
import com.fixify.entity.Vendor;

public interface Servicesservice {
	
	Service createService(CreateServiceRequest req , Vendor vendor) throws Exception;
	void deleteService(Long serviceId) throws Exception;
	Service updateService(Long serviceId,Service service)throws Exception;
	Service findServiceById(Long serviceId) throws Exception;
	List<Service> searchService(String query);
	List<Service> getAllServices(String category);
	List<Service> getServiceByVendorId(Long id);
	List<Service> getServicesSortedByCategoryAndLocation(String categoryId, double customerLat, double customerLng);
	List<Service> getHomeServices();
	

}

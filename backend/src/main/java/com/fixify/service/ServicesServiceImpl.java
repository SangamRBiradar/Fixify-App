package com.fixify.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.dto.CreateServiceRequest;
import com.fixify.entity.Category;
import com.fixify.entity.Vendor;
import com.fixify.repository.CategoryRepository;
import com.fixify.repository.ServiceRepository;

@Service
@Transactional
public class ServicesServiceImpl implements Servicesservice {

	@Autowired
	private ServiceRepository serviceRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public com.fixify.entity.Service createService(CreateServiceRequest req, Vendor vendor) throws Exception {
		// TODO Auto-generated method stub

		Category category = categoryRepository.findByCategoryId(req.getCategory());

		if (category == null) {
			throw new Exception("Category Not Found");
		}

		int discountPercentage = calculateDiscountPerc(req.getMrpPrice(), req.getSellingPrice());

		com.fixify.entity.Service service = new com.fixify.entity.Service();
		service.setVendor(vendor);
		service.setCategory(category);
		service.setDescription(req.getDescription());
		service.setTitle(req.getTitle());
		service.setSellingPrice(req.getSellingPrice());
		service.setMrpPrice(req.getMrpPrice());
		service.setImages(req.getImages());
		service.setCreatedAt(LocalDateTime.now());
		service.setDiscountPercent(discountPercentage);

		return serviceRepository.save(service);

	}

	private int calculateDiscountPerc(int mrpPrice, int sellingPrice) {
		if (mrpPrice <= 0) {
			throw new IllegalArgumentException("Actual Price must be greate than zero");
		}
		double discount = mrpPrice - sellingPrice;
		double discountPercentage = (discount / mrpPrice) * 100;
		return (int) discountPercentage;

	}

	@Override
	public void deleteService(Long serviceId) throws Exception {
		// TODO Auto-generated method stub

		com.fixify.entity.Service service = findServiceById(serviceId);
		serviceRepository.delete(service);

	}

	@Override
	public com.fixify.entity.Service updateService(Long serviceId, com.fixify.entity.Service service) throws Exception {
		// TODO Auto-generated method stub
		findServiceById(serviceId);
		service.setId(serviceId);

		return serviceRepository.save(service);
	}

	@Override
	public com.fixify.entity.Service findServiceById(Long serviceId) throws Exception {
		// TODO Auto-generated method stub
		com.fixify.entity.Service service = serviceRepository.findById(serviceId)
				.orElseThrow(() -> new Exception("Service Not Found"));
		service.getImages().size();
		return service;
	}

	@Override
	public List<com.fixify.entity.Service> searchService(String query) {
		// TODO Auto-generated method stub
		return serviceRepository.searchService(query);
	}

//	@Override
//	public Page<com.fixify.entity.Service> getAllServices(String category) {
//		// TODO Auto-generated method stub
//		Specification<com.fixify.entity.Service> specs = (root,query,riteriaBuilder)->{
//			List<Predicate> predicate = new ArrayList<>();
//		}
//		return null;
//	}

	@Override
	public List<com.fixify.entity.Service> getServiceByVendorId(Long id) {
		// TODO Auto-generated method stub
		List<com.fixify.entity.Service> services = serviceRepository.findByVendorId(id);
		for (com.fixify.entity.Service service : services) {
	        service.getImages().size(); // Hibernate fetches images before closing session
	    }
		return services;

	}

	@Override
	public List<com.fixify.entity.Service> getServicesSortedByCategoryAndLocation(String categoryId, double customerLat,
			double customerLng) {

		// Fetch category from database
		Category category = categoryRepository.findByCategoryId(categoryId);
		if (category == null) {
			throw new RuntimeException("Category not found: " + categoryId);
		}

		// Fetch services only within the selected category
		List<com.fixify.entity.Service> services = serviceRepository.findByCategory(category);
		for (com.fixify.entity.Service service : services) {
	        service.getImages().size(); // Hibernate fetches images before closing session
	    }

		// Sort services based on the distance between customer and vendor
		services.sort(Comparator.comparingDouble(p -> calculateDistance(customerLat, customerLng,
				p.getVendor().getShopDetails().getLatitude(), p.getVendor().getShopDetails().getLongitude())));

		return services;
	}
//18.52,73.85
	// Haversine formula to calculate distance between two latitude/longitude points
	private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
		final int R = 6371; // Radius of the earth in km
		double latDistance = Math.toRadians(lat2 - lat1);
		double lonDistance = Math.toRadians(lon2 - lon1);
		double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) + Math.cos(Math.toRadians(lat1))
				* Math.cos(Math.toRadians(lat2)) * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c; // Distance in km
	}

	@Override
	public List<com.fixify.entity.Service> getAllServices(String category) {
		// TODO Auto-generated method stub
		List<com.fixify.entity.Service> services=serviceRepository.findByCategory_CategoryId(category);
		
		for (com.fixify.entity.Service service : services) {
	        service.getImages().size(); // Hibernate fetches images before closing session
	    }
		return  services;
	}

	@Override
	public List<com.fixify.entity.Service> getHomeServices() {
		// TODO Auto-generated method stub
		List<com.fixify.entity.Service> services=serviceRepository.findAll();
		
		for (com.fixify.entity.Service service : services) {
	        service.getImages().size(); // Hibernate fetches images before closing session
	    }
		return services;
	}

}

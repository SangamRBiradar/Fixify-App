package com.fixify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.VendorSellReport;

public interface VendorReportRepository extends JpaRepository<VendorSellReport, Long> {
	
	VendorSellReport findByVendorId(Long vendorId);

}

package com.fixify.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.entity.Vendor;
import com.fixify.entity.VendorSellReport;
import com.fixify.repository.VendorReportRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class VendorReportServiceImpl implements VendorReportService {
	
	
	private final VendorReportRepository reportRepository;
	
	@Override
	public VendorSellReport getVendorReport(Vendor vendor) {
		// TODO Auto-generated method stub
		
		VendorSellReport vr = reportRepository.findByVendorId(vendor.getId());
		
		
		if(vr==null) {
			VendorSellReport newReport= new VendorSellReport();
			newReport.setVendor(vendor);
			return reportRepository.save(newReport);
			
		}
		
		return vr;
	}

	@Override
	public VendorSellReport updateVendorReport(VendorSellReport vendorSellReport) {
		// TODO Auto-generated method stub
		return reportRepository.save(vendorSellReport);
	}
	
	

}

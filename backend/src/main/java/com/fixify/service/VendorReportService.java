package com.fixify.service;

import com.fixify.entity.Vendor;
import com.fixify.entity.VendorSellReport;

public interface VendorReportService {
	
	VendorSellReport getVendorReport(Vendor vendorId);
	
	VendorSellReport updateVendorReport(VendorSellReport vendorSellReport);

}

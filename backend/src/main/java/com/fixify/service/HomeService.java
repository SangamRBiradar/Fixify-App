package com.fixify.service;

import java.util.List;

import com.fixify.entity.Home;
import com.fixify.entity.HomeCategory;

public interface HomeService {
	
	public Home CreateHomePageData(List<HomeCategory> allcategories);

}

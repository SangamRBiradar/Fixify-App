package com.fixify.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.entity.Home;
import com.fixify.entity.HomeCategory;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
@Transactional
public class HomeServiceImpl implements HomeService{

	
	
	@Override
	public Home CreateHomePageData(List<HomeCategory> allcategories) {
		// TODO Auto-generated method stub
		
		
		
		return null;
	}

}

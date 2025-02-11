package com.fixify.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShopDetails {

	private String shopName;
	private String shopEmail;
	private String shopMobile;
	private String shopAddress;
	private double longitude;
	private double latitude;
	private String logo;
	private String banner;

}

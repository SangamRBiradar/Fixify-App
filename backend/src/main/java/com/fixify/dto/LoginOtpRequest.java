package com.fixify.dto;

import com.fixify.entity.USER_ROLE;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class LoginOtpRequest {
	
	private String email;
	private String otp;
	private USER_ROLE role;

}

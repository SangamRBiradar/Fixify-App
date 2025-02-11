package com.fixify.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {
	
	private String email;
	private String fullName;
	private String otp;
	private String mobile;

}

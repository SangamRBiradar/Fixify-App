package com.fixify.dto;

import com.fixify.entity.USER_ROLE;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
	
	private String jwt;
	private String message;
	private USER_ROLE role;

}

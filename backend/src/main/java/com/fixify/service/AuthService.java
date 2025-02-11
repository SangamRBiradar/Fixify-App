package com.fixify.service;

import com.fixify.dto.AuthResponse;
import com.fixify.dto.LoginRequest;
import com.fixify.dto.SignUpRequest;
import com.fixify.entity.USER_ROLE;

public interface AuthService {
	
	void sendLoginOtp(String email,USER_ROLE role) throws Exception;
	String createUser(SignUpRequest req) throws Exception;
	AuthResponse signing(LoginRequest req);
	

}

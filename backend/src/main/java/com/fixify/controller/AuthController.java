package com.fixify.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.dto.ApiResponse;
import com.fixify.dto.AuthResponse;
import com.fixify.dto.LoginOtpRequest;
import com.fixify.dto.LoginRequest;
import com.fixify.dto.SignUpRequest;
import com.fixify.entity.USER_ROLE;
import com.fixify.entity.VerificationCode;
import com.fixify.service.AuthService;




@RestController
@RequestMapping("/auth")
public class AuthController {
	
//	@GetMapping("/csrf-token")
//    public CsrfToken getCsrfToken(HttpServletRequest request) {
//        // Retrieve the CSRF token
//        return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
//    }
	
	@Autowired
	private AuthService authService;
	
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignUpRequest req) throws Exception {
		
		String jwt = authService.createUser(req);
		AuthResponse res = new AuthResponse();
		res.setJwt(jwt);
		res.setMessage("register success");
		res.setRole(USER_ROLE.ROLE_CUSTOMER);
		return  ResponseEntity.ok(res);
	}
	
	//1
	@PostMapping("/sent/login-signup-otp")
	public ResponseEntity<ApiResponse> sendOtpHandler(@RequestBody LoginOtpRequest req) throws Exception {
		
		authService.sendLoginOtp(req.getEmail(),req.getRole());
		ApiResponse res = new ApiResponse();
		res.setMessage("OTP sent successfully ...");
		return  ResponseEntity.ok(res);
	}
	
	@PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest)  {

        AuthResponse authResponse = authService.signing(loginRequest);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }


}

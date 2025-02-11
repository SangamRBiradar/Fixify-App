
package com.fixify.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.dto.ApiResponse;

@RestController
public class HomeController {
	
	@GetMapping("/")
	public ApiResponse getAllUser() {
		ApiResponse res = new ApiResponse();
		res.setMessage("Hello");
		return res;
	}
}

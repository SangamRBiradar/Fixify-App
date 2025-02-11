package com.fixify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.VerificationCode;

public interface VerificationCodeRepository extends  JpaRepository<VerificationCode, Long> {
	
	VerificationCode findByEmail(String email);

	VerificationCode findByOtp(String otp);

}

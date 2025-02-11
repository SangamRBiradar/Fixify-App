package com.fixify.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fixify.custom_exception.VendorException;
import com.fixify.dto.AuthResponse;
import com.fixify.dto.LoginRequest;
import com.fixify.entity.AccountStatus;
import com.fixify.entity.Vendor;
import com.fixify.entity.VendorSellReport;
import com.fixify.entity.VerificationCode;
import com.fixify.repository.VerificationCodeRepository;
import com.fixify.security.JwtProvider;
import com.fixify.service.AuthService;
import com.fixify.service.EmailService;
import com.fixify.service.VendorReportService;
import com.fixify.service.VendorService;
import com.fixify.utils.OtpUtils;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/vendors")
public class VendorController {
	
	@Autowired
	private VendorService vendorService;
	
	@Autowired
	private VerificationCodeRepository verificationCodeRepository;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private VendorReportService vendorReportService;
	
	@Autowired
	private JwtProvider jwtProvider;
	
	
//	@Autowired
//	private VerificationService
		
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> loginVendor(@RequestBody LoginRequest req) {
		
		System.out.println(req.getEmail());
//		String otp = req.getOtp();
		String email = req.getEmail();
		
		req.setEmail("vendor_"+email);
		System.out.println(email);
		AuthResponse authResponse = authService.signing(req);
		return ResponseEntity.ok(authResponse);
		
		
	}
	

    @PatchMapping("/verify/{otp}")
    public ResponseEntity<Vendor> verifyVendorEmail(@PathVariable String otp) throws Exception {

        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);

        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("wrong otp...");
        }

        Vendor vendor = vendorService.verifyEmail(verificationCode.getEmail(), otp);

        return new ResponseEntity<>(vendor, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<Vendor> createVendor(@RequestBody Vendor vendor) throws Exception, MessagingException {
        Vendor savedVendor = vendorService.createVendor(vendor);

      
        String otp = OtpUtils.generateOTP();

		VerificationCode verificationCode = new VerificationCode();
		verificationCode.setOtp(otp);
		verificationCode.setEmail(vendor.getEmail());
		verificationCodeRepository.save(verificationCode);
		
        String subject = "Fixify app Email Verification Code";
        String text = "Welcome to Fixify app, verify your account using this link ";
        String frontend_url = "http://localhost:3000/verify-vendor/";
        emailService.sendVerificationOtpEmail(vendor.getEmail(), verificationCode.getOtp(), subject, text + frontend_url);
        return new ResponseEntity<>(savedVendor, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Vendor> getVendorById(@PathVariable Long id) throws VendorException {
        Vendor vendor = vendorService.getVendorById(id);
        return new ResponseEntity<>(vendor, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Vendor> getVendorByJwt(
            @RequestHeader("Authorization") String jwt) throws Exception {
        
        Vendor vendor = vendorService.getVendorProfile(jwt);
        return new ResponseEntity<>(vendor, HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<VendorSellReport> getvendorReport(
            @RequestHeader("Authorization") String jwt) throws Exception {
//        String email = jwtProvider.getEmailFromJwtToken(jwt);
        Vendor vendor = vendorService.getVendorProfile(jwt);
        VendorSellReport report = vendorReportService.getVendorReport(vendor);
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Vendor>> getAllVendors(
            @RequestParam(required = false) AccountStatus status) {
        List<Vendor> vendors = vendorService.getAllVendors(status);
        return ResponseEntity.ok(vendors);
    }

    @PatchMapping()
    public ResponseEntity<Vendor> updateVendor(
            @RequestHeader("Authorization") String jwt, @RequestBody Vendor vendor) throws Exception {

        Vendor profile = vendorService.getVendorProfile(jwt);
        Vendor updatedvendor = vendorService.updateVendor(profile.getId(), vendor);
        return ResponseEntity.ok(updatedvendor);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletevendor(@PathVariable Long id) throws Exception {

        vendorService.deleteVendor(id);
        return ResponseEntity.noContent().build();

    }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}

package com.fixify.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.dto.AuthResponse;
import com.fixify.dto.LoginRequest;
import com.fixify.dto.SignUpRequest;
import com.fixify.entity.Cart;
import com.fixify.entity.USER_ROLE;
import com.fixify.entity.User;
import com.fixify.entity.Vendor;
import com.fixify.entity.VerificationCode;
import com.fixify.repository.CartRepository;
import com.fixify.repository.UserRepository;
import com.fixify.repository.VendorRepository;
import com.fixify.repository.VerificationCodeRepository;
import com.fixify.security.JwtProvider;
import com.fixify.utils.OtpUtils;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private VendorRepository vendorRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	// 2 create cart

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private VerificationCodeRepository verificationCodeRepository;

	@Autowired
	private EmailService emailService;

	@Autowired
	private CustomeUserServiceImplementation customUserDetails;

	@Override
	public String createUser(SignUpRequest req) throws Exception {
		// TODO Auto-generated method stub

		// is verification code present or not
		VerificationCode verificationCode = verificationCodeRepository.findByEmail(req.getEmail());

		if (verificationCode == null || !verificationCode.getOtp().equals(req.getOtp())) {
			throw new Exception("wrong otp");
		}

		User user = userRepository.findByEmail(req.getEmail());

		if (user == null) {
			User createdUser = new User();
			createdUser.setEmail(req.getEmail());
			createdUser.setFullName(req.getFullName());
			createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
			createdUser.setMobile(req.getMobile());
			createdUser.setPassword(passwordEncoder.encode(req.getOtp()));

			
			user = userRepository.save(createdUser);

			Cart cart = new Cart();
			cart.setUser(user);
			cartRepository.save(cart);
		}

		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));

		Authentication authentication = new UsernamePasswordAuthenticationToken(req.getEmail(), null, authorities);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		return jwtProvider.generateToken(authentication);
	}

	@Override
	public void sendLoginOtp(String email, USER_ROLE role) throws Exception {
		// TODO Auto-generated method stub
		String SIGNING_PREFIX = "signing_";
//		String VENDOR_PREFIX = "vendor_";

		if (email.startsWith(SIGNING_PREFIX)) {
			email = email.substring(SIGNING_PREFIX.length());

			if (role.equals(USER_ROLE.ROLE_CUSTOMER)) {

				User user = userRepository.findByEmail(email);
				if (user == null) {
					throw new Exception("user not exist with provided email");
				}
			} else {
				Vendor vendor = vendorRepository.findByEmail(email);
				if (vendor == null) {
					throw new Exception("vendor not exist with provided email");
				}
			}

		}
		VerificationCode isExist = verificationCodeRepository.findByEmail(email);

		if (isExist != null) {
			verificationCodeRepository.delete(isExist);
		}

		String otp = OtpUtils.generateOTP();

		VerificationCode verificationCode = new VerificationCode();
		verificationCode.setOtp(otp);
		verificationCode.setEmail(email);
		verificationCodeRepository.save(verificationCode);

		String subject = "fixify app fixing login/signup otp";
		String text = "Your Login/signup otp is - ";

		emailService.sendVerificationOtpEmail(email, otp, subject, text);

	}

	@Override
	public AuthResponse signing(LoginRequest req) {
		// TODO Auto-generated method stub

		String username = req.getEmail();
		String otp = req.getOtp();

		Authentication authentication = authenticate(username, otp);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);
		AuthResponse authResponse = new AuthResponse();

		authResponse.setMessage("Login Success");
		authResponse.setJwt(token);
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

		String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

		authResponse.setRole(USER_ROLE.valueOf(roleName));

		return authResponse;
	}

	private Authentication authenticate(String username, String otp) {
		UserDetails userDetails = customUserDetails.loadUserByUsername(username);

		System.out.println("sign in userDetails - " + userDetails);

		if (userDetails == null) {
			System.out.println("sign in userDetails - null ");
			throw new BadCredentialsException("Invalid username or password");
		}

		// so important
		String VENDOR_PREFIX = "vendor_";
		if (username.startsWith(VENDOR_PREFIX)) {
			username = username.substring(VENDOR_PREFIX.length());

		}

		VerificationCode verificationCode = verificationCodeRepository.findByEmail(username);

		if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
			throw new BadCredentialsException("wrong otp...");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}

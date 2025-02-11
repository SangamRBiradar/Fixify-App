package com.fixify.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.entity.USER_ROLE;
import com.fixify.entity.User;
import com.fixify.entity.Vendor;
import com.fixify.repository.UserRepository;
import com.fixify.repository.VendorRepository;

import lombok.RequiredArgsConstructor;


@Service
@Transactional
//@RequiredArgsConstructor
public class CustomeUserServiceImplementation implements UserDetailsService {

	private final UserRepository userRepository;
	private final VendorRepository vendorRepository;
	private static final String VENDOR_PREFIX = "vendor_";

	public CustomeUserServiceImplementation(UserRepository userRepository, VendorRepository vendorRepository) {
		this.userRepository = userRepository;
		this.vendorRepository = vendorRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if (username.startsWith(VENDOR_PREFIX)) {
			// Remove prefix to get the actual username/email
			String actualUsername = username.substring(VENDOR_PREFIX.length());
			Vendor vendor = vendorRepository.findByEmail(actualUsername);
			if (vendor != null) {
				return buildUserDetails(vendor.getEmail(), vendor.getPassword(), vendor.getRole());
			}
		} else {
			User user = userRepository.findByEmail(username);
			if (user != null) {
				return buildUserDetails(user.getEmail(), user.getPassword(), user.getRole());
			}
		}

		throw new UsernameNotFoundException("User or Vendor not found with email - " + username);
	}

	private UserDetails buildUserDetails(String email, String password, USER_ROLE role) {
		if (role == null) role = USER_ROLE.ROLE_CUSTOMER;

		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(role.toString()));

		return new org.springframework.security.core.userdetails.User(email, password, authorities);
	}
}

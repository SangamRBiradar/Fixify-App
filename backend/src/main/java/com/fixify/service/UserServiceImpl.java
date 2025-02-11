package com.fixify.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.entity.User;
import com.fixify.repository.UserRepository;
import com.fixify.security.JwtProvider;

@Service
@Transactional

public class UserServiceImpl  implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private  JwtProvider jwtProvider;
	
	@Override
	public User findUserByJwtToken(String jwt) throws Exception {
		// TODO Auto-generated method stub
		String email = jwtProvider.getEmailFromJwtToken(jwt);
		
		return this.findUserByEmail(email);
	}

	@Override
	public User findUserByEmail(String email) throws Exception {
		// TODO Auto-generated method stub
		User user = userRepository.findByEmail(email);
		if(user==null) {
			throw new Exception("user not found with email"+email);
		}
		return user;
	}

}

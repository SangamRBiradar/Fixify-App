package com.fixify.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.entity.User;
import com.fixify.repository.UserRepository;

public interface UserService {

	public User findUserByJwtToken(String jwt)throws Exception;
	User findUserByEmail(String email) throws Exception;

}

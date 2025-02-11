package com.fixify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User  findByEmail(String email);
	
}

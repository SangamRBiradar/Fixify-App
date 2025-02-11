package com.fixify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fixify.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}

package com.immo.immobilier.Dao;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.immo.immobilier.model.Users;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface UsersDao extends JpaRepository<Users, String>{
	
	Users findByEmail(String email);
	
}

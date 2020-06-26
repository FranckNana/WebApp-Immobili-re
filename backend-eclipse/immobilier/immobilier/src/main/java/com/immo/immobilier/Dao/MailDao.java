package com.immo.immobilier.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.immo.immobilier.model.Email;
import com.immo.immobilier.model.Publication;

@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface MailDao extends JpaRepository<Email, Integer>{

	@Query("SELECT e FROM Email e WHERE user_id = :email")
	List<Email> getEmail(String email);

}

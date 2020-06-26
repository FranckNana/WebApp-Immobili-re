package com.immo.immobilier.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.immo.immobilier.model.Publication;

@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface PublicationDao extends JpaRepository<Publication, Integer>{
	
	Publication findById(int id);
	
	@Query("SELECT p FROM Publication p WHERE promoteur_id = :promoteur_id")
	List<Publication>  getPub(@Param("promoteur_id") String mail);

}

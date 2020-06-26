package com.immo.immobilier.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;


@Entity
public class Publication implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Id
	private int id;
	
    private String type;
    private String fonction;
    private double superficie;
    private double prix;
    private String adresse;
    private String photo;
    
    @Transient
    private String email;
    
    @ManyToOne
    @JoinColumn(name="promoteur_id")
    private Users user;
    
	public Publication() {
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFonction() {
		return fonction;
	}

	public void setFonction(String fonction) {
		this.fonction = fonction;
	}

	public double getSuperficie() {
		return superficie;
	}

	public void setSuperfiicie(double superfiicie) {
		this.superficie = superfiicie;
	}

	public double getPrix() {
		return prix;
	}

	public void setPrix(double prix) {
		this.prix = prix;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public void setSuperficie(double superficie) {
		this.superficie = superficie;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Publication [id=" + id + ", type=" + type + ", fonction=" + fonction + ", superficie=" + superficie
				+ ", prix=" + prix + ", adresse=" + adresse + ", photo=" + photo + ", email=" + email + ", user=" + user
				+ "]";
	}

	
    
}

package com.immo.immobilier.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Email {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	
	private String nom;
	private String emailDst;
	private String emailFrom;
	private String message;
	
    @ManyToOne
    @JoinColumn(name="user_id")
    private Users user;
	
	public Email() {
	}

	public Email(String nom, String emailDst, String message) {
		this.nom = nom;
		this.emailDst = emailDst;
		this.message = message;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getEmailDst() {
		return emailDst;
	}

	public void setEmailDst(String emailDst) {
		this.emailDst = emailDst;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getEmailFrom() {
		return emailFrom;
	}

	public void setEmailFrom(String emailFrom) {
		this.emailFrom = emailFrom;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Email [id=" + id + ", nom=" + nom + ", emailDst=" + emailDst + ", emailFrom=" + emailFrom + ", message="
				+ message + "]";
	}
	
	
}

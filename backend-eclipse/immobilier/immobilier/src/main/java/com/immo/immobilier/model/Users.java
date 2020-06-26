package com.immo.immobilier.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonCreator;

@Entity
public class Users implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	private String email;
	private String name;
	private String surname;
	private String phoneNumber;
	private String address;
	private String city;
	private String codePostal;
	
	@Enumerated(EnumType.STRING)
	private AccountType accountType;
	
	@OneToMany(mappedBy = "user")
	private Set<Publication> publications = new HashSet<>();
	
	@OneToMany(mappedBy = "user")
	private Set<Email> usermail = new HashSet<>();
	
	public Users() {
	}
	
	public boolean addPublication(Publication pub) {
		return this.publications.add(pub);
	}
	
	/*public Set<Publication> getPublications(){
		return this.publications;
	}*/
	
	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}

	
	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}

	
	public String getSurname() {
		return surname;
	}


	public void setSurname(String surname) {
		this.surname = surname;
	}

	
	public String getPhoneNumber() {
		return phoneNumber;
	}


	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	
	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}

	
	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}

	
	public String getCodePostal() {
		return codePostal;
	}


	public void setCodePostal(String codePostal) {
		this.codePostal = codePostal;
	}

	
	@JsonCreator
	public static Users forValues(String email, String name, String surname, String phoneNumber, String address, String city,
			String codePostal, AccountType accountType) {

		Users user = new Users();
		
		user.email = email;
		user.name = name;
		user.surname = surname;
		user.phoneNumber = phoneNumber;
		user.address = address;
		user.city = city;
		user.codePostal = codePostal;
		user.accountType = accountType;
		
		return user;
	}


	@Override
	public String toString() {
		return "Users [email=" + email + ", name=" + name + ", surname=" + surname + ", phoneNumber=" + phoneNumber
				+ ", address=" + address + ", city=" + city + ", codePostal=" + codePostal + ", accountType="
				+ accountType + "]";
	}


	public AccountType getAccountType() {
		return accountType;
	}


	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}


}

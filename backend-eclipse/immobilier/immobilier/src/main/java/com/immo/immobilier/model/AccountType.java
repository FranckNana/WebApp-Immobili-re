package com.immo.immobilier.model;

import java.util.Arrays;
import java.util.NoSuchElementException;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum AccountType {
    PROMOTEUR("promoteur"),
	CLIENT("client");
    
	private String label;
	
	private AccountType(String label) {
		this.label = label;
	}
	
	@JsonCreator
	public static AccountType forValues(String label) {
		
		AccountType accountType = Arrays.stream(values())
					.filter(aType -> aType.label.equals(label))
					.findAny()
					.orElseThrow(() -> new NoSuchElementException("No account type for : " +label));
		
		return accountType;
	}
	
	@JsonValue
	public String getLabel() {
		return label;
	}
	
	private AccountType(){
	}


	public void setLabel(String label) {
		this.label = label;
	}
	
}


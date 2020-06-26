package com.immo.immobilier.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserIntrouvableException extends RuntimeException {
	public UserIntrouvableException(String string) {
		super(string);
	}

}

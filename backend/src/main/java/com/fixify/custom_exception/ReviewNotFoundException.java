package com.fixify.custom_exception;

public class ReviewNotFoundException extends Exception {
    public ReviewNotFoundException(String message) {
        super(message);
    }
}

package com.fixify.custom_exception;

public class ShopNotFoundException extends Exception {
    public ShopNotFoundException(String message) {
        super(message);
    }
}

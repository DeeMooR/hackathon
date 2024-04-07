package com.example.Backend.exception;

public class ReceiverAlreadyExists extends Exception{
    public ReceiverAlreadyExists(String message) {
        super(message);
    }
}
package com.example.Backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ReceiverEntity {

    @Id
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

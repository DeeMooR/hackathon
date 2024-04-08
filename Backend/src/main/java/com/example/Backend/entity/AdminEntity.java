package com.example.Backend.entity;

import jakarta.persistence.*;

@Entity
public class AdminEntity {
    //Вариант ключ перекинуть на логин//Оставляем так
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String login;
    private String password;
    private String name;
    private byte[] sold;

    public AdminEntity(){}

    public void setId(int id) {
        this.id = id;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public int getId() {
        return id;
    }

    public byte[] getSold() {
        return sold;
    }

    public void setSold(byte[] sold) {
        this.sold = sold;
    }
}

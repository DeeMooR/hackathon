package com.example.Backend.model;

import com.example.Backend.entity.AdminEntity;
import org.springframework.jmx.export.annotation.ManagedOperation;

public class Admin {
    //тут тоже можно обойтись без id//Id оставлеям везде
    private int id;
    private String login;
    private String password;
    private String name;
    private Admin(){}

    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public static Admin toModel(AdminEntity adminEntity){
        Admin model=new Admin();
        model.setId(adminEntity.getId());
        model.setLogin(adminEntity.getLogin());
        model.setName(adminEntity.getName());
        model.setPassword(adminEntity.getPassword());
        return model;
    }

    public int getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public String getLogin() {
        return login;
    }

    public String getName() {
        return name;
    }
}

package com.example.Backend.model;

import com.example.Backend.entity.AdminEntity;
import org.springframework.jmx.export.annotation.ManagedOperation;

public class Admin {
    private String name;

    private Admin(){}

    public void setName(String name) {
        this.name = name;
    }

    public static Admin toModel(AdminEntity adminEntity){
        Admin model=new Admin();
        model.setName(adminEntity.getName());
        return model;
    }

    public String getName() {
        return name;
    }
}

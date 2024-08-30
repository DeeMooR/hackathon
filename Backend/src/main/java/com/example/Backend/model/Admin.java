package com.example.Backend.model;

import com.example.Backend.entity.AdminEntity;
import org.springframework.jmx.export.annotation.ManagedOperation;

public class Admin {
    private String name;
    private String accessKey;

    private Admin(){}

    public void setName(String name) {
        this.name = name;
    }

    public static Admin toModel(AdminEntity adminEntity){
        Admin model = new Admin();
        model.setName(adminEntity.getName());
        model.setAccessKey(adminEntity.getAccessKey());
        return model;
    }

    public String getName() {
        return name;
    }

    public String getAccessKey() {
        return accessKey;
    }

    public void setAccessKey(String accessKey) {
        this.accessKey = accessKey;
    }
}

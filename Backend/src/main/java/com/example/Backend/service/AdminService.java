package com.example.Backend.service;

import com.example.Backend.entity.AdminEntity;
import com.example.Backend.exception.MyException;
import com.example.Backend.model.Admin;
import com.example.Backend.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepo adminRepo;
    public AdminEntity authoriz(AdminEntity adminEntity) throws MyException {
        System.out.println(adminEntity);
        AdminEntity admin = adminRepo.findByLogin(adminEntity.getLogin());
        if (admin != null && admin.getPassword().equals(adminEntity.getPassword())) {
            return admin;
        } else {
            throw new MyException("Неверный пароль или пароль");
        }
    }
}

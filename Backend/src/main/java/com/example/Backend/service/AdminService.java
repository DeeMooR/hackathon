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
    public AdminEntity authoriz(String login, String password) throws MyException {
        AdminEntity admin = adminRepo.findByLogin(login);
        if (admin != null||admin.getPassword().equals(password)) {
            return admin;
        } else {
            throw new MyException("Неверный пароль или пароль");
        }
    }
}

package com.example.Backend.controller;

import com.example.Backend.entity.AdminEntity;
import com.example.Backend.exception.MyException;
import com.example.Backend.model.Admin;
import com.example.Backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {""})
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/auth")
    public ResponseEntity authorization(@RequestBody AdminEntity admin ) throws MyException {
        AdminEntity authenticatedUser = adminService.authoriz(admin.getLogin(), admin.getPassword());
        if (authenticatedUser != null) {
            return ResponseEntity.ok(authenticatedUser.getName());
        } else {
            return ResponseEntity.badRequest().body("Неверный логин или пароль");
        }
    }
}

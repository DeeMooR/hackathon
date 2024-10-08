package com.example.Backend.controller;

import com.example.Backend.entity.AdminEntity;
import com.example.Backend.exception.MyException;
import com.example.Backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/auth")
    public ResponseEntity authorization(@RequestBody AdminEntity admin ) throws MyException {
        try{
            return ResponseEntity.ok(adminService.authoriz(admin));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/new")
    public ResponseEntity create(@RequestBody AdminEntity admin ) throws MyException {
        try{
            return ResponseEntity.ok(adminService.create(admin));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/check")
    public ResponseEntity check(@RequestBody AdminEntity admin) throws MyException{
        try{
            return ResponseEntity.ok(adminService.check(admin));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
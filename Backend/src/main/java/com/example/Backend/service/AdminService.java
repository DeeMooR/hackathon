package com.example.Backend.service;

import com.example.Backend.entity.AdminEntity;
import com.example.Backend.exception.MyException;
import com.example.Backend.model.Admin;
import com.example.Backend.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Random;

@Service
public class AdminService {
    @Autowired
    private AdminRepo adminRepo;
    public Admin authoriz(AdminEntity adminEntity) throws MyException, NoSuchAlgorithmException {
        AdminEntity admin = adminRepo.findByLogin(adminEntity.getLogin());
        if (admin != null && verifyPassword(adminEntity.getPassword(), admin.getPassword(), admin.getSold())) {
            return Admin.toModel(admin);
        } else {
            throw new MyException("Неверный пароль или пароль");
        }
    }

    public boolean create(AdminEntity adminEntity) throws MyException, NoSuchAlgorithmException {
        if(adminRepo.findByLogin(adminEntity.getLogin()) != null) {
            throw new MyException("Неверный пароль или пароль");
        }
        byte[] salt = generateSalt();
        adminEntity.setSold(salt);
        String password = hashPassword(adminEntity.getPassword(), salt);
        adminEntity.setPassword(password);
        adminEntity.setAccessKey(generateKey());
        adminRepo.save(adminEntity);
        return true;
    }

    public static byte[] generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    // Хеширование пароля с использованием соли
    public static String hashPassword(String password, byte[] salt) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        digest.reset();
        digest.update(salt);
        byte[] hashedBytes = digest.digest(password.getBytes());
        return Base64.getEncoder().encodeToString(hashedBytes);
    }

    public static boolean verifyPassword(String password, String hashedPassword, byte[] salt) throws NoSuchAlgorithmException {
        String newHashedPassword = hashPassword(password, salt);
        return newHashedPassword.equals(hashedPassword);
    }

    public static String generateKey(){
        String key = "";
        Random random = new Random();
        char ch;
        for(int i =0; i < 13; i++){
            ch = (char) (random.nextInt(94) + 33);
            key += ch;
        }
        return key;
    }

    public String check(AdminEntity adminEntity) throws MyException {
        AdminEntity admin = adminRepo.findByAccessKey(adminEntity.getAccessKey());
        if(admin == null)
            throw new MyException("NO-NO-NO-NO you are not admin");
        return admin.getName();
    }
}

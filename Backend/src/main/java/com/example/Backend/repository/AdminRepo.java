package com.example.Backend.repository;
import com.example.Backend.entity.AdminEntity;
import org.springframework.data.repository.CrudRepository;


public interface AdminRepo extends CrudRepository<AdminEntity, Integer>{
    AdminEntity findByLogin(String login);
    AdminEntity findByAccessKey(String accessKey);
    AdminEntity findByName(String name);
}

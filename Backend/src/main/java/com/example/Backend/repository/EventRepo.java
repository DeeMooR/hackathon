package com.example.Backend.repository;


import com.example.Backend.entity.EventEntity;
import org.springframework.data.repository.CrudRepository;

public interface EventRepo extends CrudRepository<EventEntity, Integer> {
    EventEntity findByTitle(String title);
}

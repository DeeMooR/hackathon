package com.example.Backend.repository;

import com.example.Backend.entity.ReceiverEntity;
import org.springframework.data.repository.CrudRepository;

public interface ReceiverRepo extends CrudRepository<ReceiverEntity, String> {
}

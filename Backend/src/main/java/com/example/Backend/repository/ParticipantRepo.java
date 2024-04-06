package com.example.Backend.repository;

import com.example.Backend.entity.AdminEntity;
import com.example.Backend.entity.ParticipantEntity;
import org.springframework.data.repository.CrudRepository;

public interface ParticipantRepo extends CrudRepository<ParticipantEntity, Integer> {
}

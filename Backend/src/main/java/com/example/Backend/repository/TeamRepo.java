package com.example.Backend.repository;

import com.example.Backend.entity.TeamEntity;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepo extends CrudRepository<TeamEntity, Integer> {
}

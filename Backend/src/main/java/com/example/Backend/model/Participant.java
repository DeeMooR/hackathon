package com.example.Backend.model;

import com.example.Backend.entity.EventEntity;
import com.example.Backend.entity.ParticipantEntity;


public class Participant {

    private int id;
    private String fullNameAndGroup;

    public static Participant toModel(ParticipantEntity entity){
        return new Participant(entity);
    }

    public Participant(ParticipantEntity entity) {
        id = entity.getId();
        fullNameAndGroup = entity.getFullNameAndGroup();
    }
}

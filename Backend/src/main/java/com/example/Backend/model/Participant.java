package com.example.Backend.model;


import com.example.Backend.entity.ParticipantEntity;


public class Participant {

    private String fullNameAndGroup;

    public static Participant toModel(ParticipantEntity entity){
        return new Participant(entity);
    }

    public Participant(ParticipantEntity entity) {
        fullNameAndGroup = entity.getFullNameAndGroup();
    }

    public String getFullNameAndGroup() {
        return fullNameAndGroup;
    }

    public void setFullNameAndGroup(String fullNameAndGroup) {
        this.fullNameAndGroup = fullNameAndGroup;
    }
}

package com.example.Backend.model;


import com.example.Backend.entity.ParticipantEntity;


public class Participant {

    private String name;
    private String surname;
    private String groupNumber;

    public static Participant toModel(ParticipantEntity entity){
        return new Participant(entity);
    }

    public Participant(ParticipantEntity entity) {
        name = entity.getName();
        surname = entity.getSurname();
        groupNumber = entity.getGroupNumber();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getGroupNumber() {
        return groupNumber;
    }

    public void setGroupNumber(String groupNumber) {
        this.groupNumber = groupNumber;
    }
}

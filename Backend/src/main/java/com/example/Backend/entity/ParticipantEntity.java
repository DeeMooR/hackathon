package com.example.Backend.entity;

import jakarta.persistence.*;

@Entity
public class ParticipantEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String fullNameAndGroup;

    @ManyToOne
    @JoinColumn(name = "eventId")
    private  EventEntity event;

    public ParticipantEntity() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullNameAndGroup() {
        return fullNameAndGroup;
    }

    public void setFullNameAndGroup(String fullNameAndGroup) {
        this.fullNameAndGroup = fullNameAndGroup;
    }

    public EventEntity getEvent() {
        return event;
    }

    public void setEvent(EventEntity event) {
        this.event = event;
    }
}

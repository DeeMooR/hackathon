package com.example.Backend.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class TeamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String team;

    @ManyToOne
    @JoinColumn(name = "eventId")
    private  EventEntity event;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "team")
    private List<ParticipantEntity> members;

    public TeamEntity() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public EventEntity getEvent() {
        return event;
    }

    public void setEvent(EventEntity event) {
        this.event = event;
    }

    public List<ParticipantEntity> getMembers() {
        return members;
    }

    public void setMembers(List<ParticipantEntity> members) {
        this.members = members;
    }
}

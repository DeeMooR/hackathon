package com.example.Backend.entity;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Entity
public class EventEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String photo;
    private String title;
    private Date date;
    private Time time;
    private String location;
    private List<String> faculties = new ArrayList<>();
    private String shortDescription;//возможно надо будет удалить
    private String description;
    private String archive;

    @OneToMany(mappedBy = "event")
    private List<ParticipantEntity> participants;


    public EventEntity() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time firstName) {
        this.time = firstName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<String> getFaculties() {
        return faculties;
    }

    public void setFaculties(List<String> faculties) {
        this.faculties = faculties;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getArchive() {
        return archive;
    }

    public void setArchive(String archive) {
        this.archive = archive;
    }

    public List<ParticipantEntity> getParticipants() {
        return participants;
    }

    public void setParticipants(List<ParticipantEntity> participants) {
        this.participants = participants;
    }
}

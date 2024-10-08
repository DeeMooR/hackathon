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
    private Date date;//Возможно поменять на String//Date лучше
    private String time;//Возможно поменять на String
    private String location;
    @ElementCollection
    private List<String> faculties = new ArrayList<>();
    @Column(length = 2000)
    private String description;
    private String results;
    private String type;
    private String archive;
    private String visit;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "event")
    private List<TeamEntity> teams;


    public EventEntity() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getVisit() {
        return visit;
    }

    public void setVisit(String visit) {
        this.visit = visit;
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

    public String getTime() {
        return time;
    }

    public void setTime(String firstName) {
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

    public List<TeamEntity> getTeams() {
        return teams;
    }

    public void setTeams(List<TeamEntity> teams) {
        this.teams = teams;
    }

    public String getResults() {
        return results;
    }

    public void setResults(String result) {
        this.results = result;
    }
    @Override
    public String toString() {
        String message = "Дорогой студент, тебя ждет " + getTitle() + "\n"
                + "Где: " + getLocation() + "\n"
                + "Когда: " + getDate().toString() + " " + getTime() + "\n"
                + "За подробностями обращайся на наш сайт или в социальные сети. А вот ссылка на наш сайт:\n" +
                "http://localhost:3000/events/" + getId();;
        return message;
    }
}

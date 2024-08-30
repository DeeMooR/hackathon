package com.example.Backend.model;

import com.example.Backend.entity.EventEntity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class Event {
    private int id;
    private String photo;
    private String title;
    private Date date;
    private String time;
    private String location;
    private List<String> faculties;
    private String visit;

    public static Event toModel(EventEntity entity){
        return new Event(entity);
    }

    public Event(EventEntity entity) {
        id = entity.getId();
        photo = entity.getPhoto();
        title = entity.getTitle();
        date = entity.getDate();
        time = entity.getTime();
        location = entity.getLocation();
        faculties = new ArrayList<>();
        visit = entity.getVisit();
        faculties.addAll(entity.getFaculties());
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

    public String getVisit() {
        return visit;
    }

    public void setVisit(String visit) {
        this.visit = visit;
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

}

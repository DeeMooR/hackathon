package com.example.Backend.model;

import com.example.Backend.entity.EventEntity;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class EventDetailed {
    private int id;
    private String photo;
    private String title;
    private Date date;
    private String time;
    private String location;
    private List<String> faculties;
    private String description;
    private String archive;
    private String results;
    private String type;
    private String visit;
    private String page;

    public static EventDetailed toModel(EventEntity entity){
        return new EventDetailed(entity);
    }

    public EventDetailed(EventEntity entity) {
        id = entity.getId();
        photo = entity.getPhoto();
        title = entity.getTitle();
        date = entity.getDate();
        time = entity.getTime();
        location = entity.getLocation();
        description = entity.getDescription();
        archive = entity.getArchive();
        faculties = new ArrayList<>();
        results = entity.getResults();
        type = entity.getType();
        visit = entity.getVisit();
        for(String str : entity.getFaculties())
            faculties.add(str);
        if(LocalDate.now().isAfter(date.toLocalDate()))
            page = "past";
        else
            page = "next";
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

    public String getResults() {
        return results;
    }

    public void setResults(String results) {
        this.results = results;
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

}

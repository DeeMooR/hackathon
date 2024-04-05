package com.example.Backend.entity;

import jakarta.persistence.*;

@Entity
public class SliderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String image;
    private int movie_id;
    private String title;
    private String text;
    private String text_button;
    private String link;

    public SliderEntity() {
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setText(String text) {
        this.text = text;
    }
    public void setText_button(String text_button) {
        this.text_button = text_button;
    }
    public void setLink(String link) {
        this.link = link;
    }

    public int getId() {
        return id;
    }
    public String getImage() {
        return image;
    }
    public int getMovie_id() {
        return movie_id;
    }
    public String getTitle() {
        return title;
    }
    public String getText() {
        return text;
    }
    public String getText_button() {
        return text_button;
    }
    public String getLink() {
        return link;
    }
}
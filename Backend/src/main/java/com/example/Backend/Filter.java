package com.example.Backend;

import java.util.ArrayList;
import java.util.List;

public class Filter {
    // Или переписать на массивы
    List<String> faculty = new ArrayList<>();
    String type;
    String visit;

    public List<String> getFaculty() {
        return faculty;
    }

    public void setFaculty(List<String> faculty) {
        this.faculty = faculty;
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
}

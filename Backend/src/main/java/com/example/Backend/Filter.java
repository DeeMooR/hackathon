package com.example.Backend;

import java.util.ArrayList;
import java.util.List;

public class Filter {
    // Или переписать на массивы
    List<String> faculty = new ArrayList<>();
    List<String> type = new ArrayList<>();
    List<String> visit = new ArrayList<>();

    public List<String> getFaculty() {
        return faculty;
    }

    public void setFaculty(List<String> faculty) {
        this.faculty = faculty;
    }

    public List<String> getType() {
        return type;
    }

    public void setType(List<String> type) {
        this.type = type;
    }

    public List<String> getVisit() {
        return visit;
    }

    public void setVisit(List<String> visit) {
        this.visit = visit;
    }
}

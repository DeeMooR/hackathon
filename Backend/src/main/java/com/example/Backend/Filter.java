package com.example.Backend;

import java.util.ArrayList;
import java.util.List;

public class Filter {
    // Или переписать на массивы
    List<String> faculties = new ArrayList<>();
    List<String> types = new ArrayList<>();
    List<String> visits = new ArrayList<>();

    public List<String> getFaculties() {
        return faculties;
    }

    public void setFaculties(List<String> faculties) {
        this.faculties = faculties;
    }

    public List<String> getTypes() {
        return types;
    }

    public void setTypes(List<String> types) {
        this.types = types;
    }

    public List<String> getVisits() {
        return visits;
    }

    public void setVisits(List<String> visits) {
        this.visits = visits;
    }
}

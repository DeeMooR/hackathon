package com.example.Backend.service;

import com.example.Backend.Filter;
import com.example.Backend.entity.EventEntity;
import com.example.Backend.exception.EventNotFoundedException;
import com.example.Backend.model.Event;
import com.example.Backend.repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepo eventRepo;

    public boolean create(EventEntity event){
        //put code here
        return true;
    }

    public boolean update(EventEntity event, int id) throws EventNotFoundedException {
        //put code here
        //don't forget about custom exception
        return true;
    }

    public boolean setResults(String result, int id) throws EventNotFoundedException {
        //put code here
        //don't forget about custom exception
        return true;
    }

    public boolean setArchive(String link, int id) throws EventNotFoundedException {
        //put code here
        //don't forget about custom exception
        return true;
    }

    public List<Event> getEvents() {
        //put code here
        //don't forget about sort
        return new ArrayList<>();
    }

    public List<Event> getForPast30days() {//Дату берем сами
        //put code here
        //don't forget about sort
        return new ArrayList<>();
    }

    public List<Event> getForPast30days(Filter filter) {//Дату берем сами
        //put code here
        //don't forget about sort
        return new ArrayList<>();
    }

    public List<Event> getNext() {//Дату берем сами
        //put code here
        //don't forget about sort
        return new ArrayList<>();
    }

    public List<Event> getNext(Filter filter) {//Дату берем сами
        //put code here
        //don't forget about sort
        return new ArrayList<>();
    }

    public boolean delete(int id) throws EventNotFoundedException {
        //put code here
        //don't forget about custom exception
        return true;
    }
}

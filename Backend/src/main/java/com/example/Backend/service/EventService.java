package com.example.Backend.service;

import com.example.Backend.Filter;
import com.example.Backend.entity.EventEntity;
import com.example.Backend.exception.EventAlredyCreate;
import com.example.Backend.exception.EventNotFoundedException;
import com.example.Backend.model.Event;
import com.example.Backend.repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Comparator.*;

@Service
public class EventService {

    @Autowired
    private EventRepo eventRepo;

    public boolean create(EventEntity event) throws EventAlredyCreate {
        if (eventRepo.findByTitle(event.getTitle())!=null){
            throw new EventAlredyCreate("Мероприятие уже существует");
        }
        eventRepo.save(event);
        return true;
    }

    public boolean update(EventEntity event, int id) throws EventNotFoundedException {
        eventRepo.findById(id).orElseThrow(() -> new EventNotFoundedException("Мероприятие не найдено"));
        event.setId(id);
        eventRepo.save(event);
        return true;
    }

    public boolean setResults(String result, int id) throws EventNotFoundedException {
        EventEntity eventEntity=eventRepo.findById(id).orElseThrow(() -> new EventNotFoundedException("Мероприятие не найдено"));
        eventEntity.setResults(result);
        return true;
    }

    public boolean setArchive(String link, int id) throws EventNotFoundedException {
        EventEntity eventEntity=eventRepo.findById(id).orElseThrow(() -> new EventNotFoundedException("Мероприятие не найдено"));
        eventEntity.setArchive(link);
        return true;
    }

    public List<EventEntity> getEvents() {
        List<EventEntity> eventList= (List<EventEntity>) eventRepo.findAll();
        return eventList;
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
        EventEntity eventEntity=eventRepo.findById(id).orElseThrow(() -> new EventNotFoundedException("Мероприятие не найдено"));
        eventRepo.delete(eventEntity);
        return true;
    }
}

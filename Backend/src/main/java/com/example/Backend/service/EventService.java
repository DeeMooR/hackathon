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
import java.time.LocalDate;
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
        }// как будто бы название пожет повторяться из года в год
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

    public List<Event> getEvents() {
        List<Event> events= new ArrayList<>();
        for(EventEntity event : (List<EventEntity>) eventRepo.findAll())
            events.add(Event.toModel(event));
        return events;
    }

    public List<Event> getForPast30days() {//Дату берем сами
        Date currentDate = Date.valueOf(LocalDate.now());//!!!Проверить
        List<EventEntity> allEvents = (List<EventEntity>) eventRepo.findAll();
        allEvents.removeIf(event -> event.getDate().after(currentDate));//!!!Проверить
        return this.sortByDateToModel(allEvents).stream().sorted(Collections.reverseOrder()).collect(Collectors.toList());//!!!Проверить
    }

    public List<Event> getForPast30days(Filter filter) {//Дату берем сами
        //put code here
        //don't forget about sort
        return new ArrayList<>();
    }

    public List<Event> getNext() {//Дату берем сами
        Date currentDate = Date.valueOf(LocalDate.now());//!!!Проверить
        List<EventEntity> allEvents = (List<EventEntity>) eventRepo.findAll();
        allEvents.removeIf(event -> event.getDate().before(currentDate));//!!!Проверить
        return this.sortByDateToModel(allEvents);
    }

    public List<Event> getNext(Filter filter) {//Дату берем сами
        //put code here
        //don't forget about sort
        return new ArrayList<>();
    }

    public boolean delete(int id) throws EventNotFoundedException {
        eventRepo.findById(id).orElseThrow(() -> new EventNotFoundedException("Мероприятие не найдено"));
        eventRepo.deleteById(id);
        return true;
    }

    public List<Event> sortByDateToModel(List<EventEntity> eventsEntities){
        eventsEntities.sort(Comparator.comparing(EventEntity::getDate));//!!!Проверить
        List<Event> events = new ArrayList<>();
        for(EventEntity event: eventsEntities)
            events.add(Event.toModel(event));
        return events;
    }
}

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
        eventRepo.save(eventEntity);
        return true;
    }

    public boolean setArchive(String link, int id) throws EventNotFoundedException {
        EventEntity eventEntity=eventRepo.findById(id).orElseThrow(() -> new EventNotFoundedException("Мероприятие не найдено"));
        eventEntity.setArchive(link);
        eventRepo.save(eventEntity);
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

    public List<Event> getForPast30days(Filter filter) {
        List<Event> events = this.getForPast30days();
        return filterAll(events, filter);
    }

    public List<Event> getNext() {//Дату берем сами
        Date currentDate = Date.valueOf(LocalDate.now());//!!!Проверить!!!Работает
        List<EventEntity> allEvents = (List<EventEntity>) eventRepo.findAll();
        allEvents.removeIf(event -> event.getDate().before(currentDate));//!!!Проверить
        return this.sortByDateToModel(allEvents);
    }

    public List<Event> getNext(Filter filter) {
        List<Event> events = this.getNext();
        return filterAll(events, filter);
    }

    public boolean delete(int id) throws EventNotFoundedException {
        eventRepo.findById(id).orElseThrow(() -> new EventNotFoundedException("Мероприятие не найдено"));
        eventRepo.deleteById(id);
        return true;
    }

    public List<Event> sortByDateToModel(List<EventEntity> eventsEntities){
        eventsEntities.sort(Comparator.comparing(EventEntity::getDate));//!!!Проверить!!Работает
        List<Event> events = new ArrayList<>();
        for(EventEntity event: eventsEntities)
            events.add(Event.toModel(event));
        return events;
    }

    public List<Event> filterFaculty(List<Event> events, List<String> faculties){
        List<Event> filterEvents = new ArrayList<>();
        for(String faculty : faculties)
            for(Event event : events)
                if(event.getFaculties().contains(faculty))
                    filterEvents.add(event);
        return filterEvents.stream().distinct().collect(Collectors.toList());
    }

    public List<Event> filterType(List<Event> events, List<String> types){
        List<Event> filterEvents = new ArrayList<>();
        for(Event event : events)
            if(types.contains(event.getType()))
                filterEvents.add(event);
        return filterEvents;
    }

    public List<Event> filterVisit(List<Event> events, List<String> visit){
        List<Event> filterEvents = new ArrayList<>();
        for(Event event : events)
            if(visit.contains(event.getVisit()))
                filterEvents.add(event);
        return filterEvents;
    }

    public List<Event> filterAll(List<Event> events, Filter filter){
        if(!filter.getFaculty().isEmpty())
            events = this.filterFaculty(events, filter.getFaculty());
        else if(!filter.getType().isEmpty())
            events = this.filterType(events, filter.getType());
        else if(!filter.getVisit().isEmpty())
            events = this.filterVisit(events, filter.getVisit());
        return events;
    }
}

package com.example.Backend.service;

import com.example.Backend.Filter;
import com.example.Backend.entity.EventEntity;
import com.example.Backend.entity.ReceiverEntity;
import com.example.Backend.exception.EventAlredyCreate;
import com.example.Backend.exception.EventNotFoundedException;
import com.example.Backend.model.Event;
import com.example.Backend.repository.EventRepo;
import com.example.Backend.repository.ReceiverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private ReceiverRepo receiverRepo;
    @Autowired
    private GmailSender mailSender;

    public EventEntity create(EventEntity event) throws EventAlredyCreate{
        eventRepo.save(event);
        for(ReceiverEntity receiver : receiverRepo.findAll())
            mailSender.send(receiver.getEmail(),event);
        return event;
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

    public List<Event> getForPast30days() {
        List<EventEntity> allEvents = (List<EventEntity>) eventRepo.findAll();
        allEvents.removeIf(event -> event.getDate().after(Date.valueOf(LocalDate.now().minusDays(1))) || event.getDate().before(Date.valueOf(LocalDate.now().minusDays(30))));
        List<Event> events = this.sortByDateToModel(allEvents);
        Collections.reverse(events);
        return events;
    }

    public List<Event> getForPast30days(Filter filter) {
        List<Event> events = this.getForPast30days();
        return filterAll(events, filter);
    }

    public List<Event> getNext() {//Дату берем сами
        Date currentDate = Date.valueOf(LocalDate.now());//!!!Проверить!!!Работает
        List<EventEntity> allEvents = (List<EventEntity>) eventRepo.findAll();
        allEvents.removeIf(event -> event.getDate().before(currentDate));//!!!Проверить!!!Работает
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
                if(event.getFaculties().contains(faculty) || event.getFaculties().contains("Все факультеты"))
                    filterEvents.add(event);
        return filterEvents.stream().distinct().collect(Collectors.toList());
    }

    public List<Event> filterType(List<Event> events, String type){
        List<Event> filterEvents = new ArrayList<>();
        for(Event event : events)
            if(type.equals(event.getType()))
                filterEvents.add(event);
        return filterEvents;
    }

    public List<Event> filterVisit(List<Event> events, String visit){
        List<Event> filterEvents = new ArrayList<>();
        for(Event event : events)
            if(visit.equals(event.getVisit()))
                filterEvents.add(event);
        return filterEvents;
    }

    public List<Event> filterAll(List<Event> events, Filter filter){
        if(!filter.getFaculty().isEmpty() && !filter.getFaculty().contains("Все факультеты"))//Проверить с пустым фильтром факультеты!!!Работает
            events = this.filterFaculty(events, filter.getFaculty());
        if(!filter.getType().isEmpty())
            events = this.filterType(events, filter.getType());
        if(!filter.getVisit().isEmpty())
            events = this.filterVisit(events, filter.getVisit());
        return events;
    }


}

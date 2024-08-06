package com.example.Backend.service;

import com.example.Backend.Filter;
import com.example.Backend.entity.EventEntity;
import com.example.Backend.entity.ReceiverEntity;
import com.example.Backend.exception.EventAlredyCreate;
import com.example.Backend.exception.EventNotFoundedException;
import com.example.Backend.model.Event;
import com.example.Backend.model.EventDetailed;
import com.example.Backend.repository.EventRepo;
import com.example.Backend.repository.ReceiverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.events.EventException;

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

    public List<Event> getPast() {
        List<EventEntity> eventsEntity = getPastEntity();
        return listToModel(eventsEntity);
    }

    public List<EventEntity> getPastEntity() {
        List<EventEntity> allEvents = (List<EventEntity>) eventRepo.findAll();
        allEvents.removeIf(event -> event.getDate().after(Date.valueOf(LocalDate.now().minusDays(1))) || event.getDate().before(Date.valueOf(LocalDate.now().minusDays(180))));
        List<EventEntity> events = this.sortByDate(allEvents);
        Collections.reverse(events);
        return events;
    }

    public List<Event> getPast(Filter filter) {
        List<EventEntity> events = this.getPastEntity();
        return filterAll(events, filter);
    }

    public List<Event> getPast(String top) {
        List<Event> events = this.getPast();
        if(events.size() > 3){
            return events.subList(0,3);
        }
        return events;
    }

    public List<Event> getNext() {//Дату берем сами
        List<EventEntity> eventsEntity = getNextEntity();
        return listToModel(eventsEntity);
    }

    public List<EventEntity> getNextEntity() {//Дату берем сами
        Date currentDate = Date.valueOf(LocalDate.now());//!!!Проверить!!!Работает
        List<EventEntity> allEvents = (List<EventEntity>) eventRepo.findAll();
        allEvents.removeIf(event -> event.getDate().before(currentDate));//!!!Проверить!!!Работает
        return this.sortByDate(allEvents);
    }

    public List<Event> getNext(Filter filter) {
        List<EventEntity> events = this.getNextEntity();
        return filterAll(events, filter);
    }

    public List<Event> getNext(String top) {
        List<Event> events = this.getNext();
        if(events.size() > 3){
            return events.subList(0,3);
        }
        return events;
    }

    public boolean delete(int id) throws EventNotFoundedException {
        eventRepo.findById(id).orElseThrow(() -> new EventNotFoundedException("Мероприятие не найдено"));
        eventRepo.deleteById(id);
        return true;
    }

    public List<EventEntity> sortByDate(List<EventEntity> eventsEntities){
        eventsEntities.sort(Comparator.comparing(EventEntity::getDate));//!!!Проверить!!Работает
        return eventsEntities;
    }

    public List<Event> listToModel(List<EventEntity> eventsEntities){
        List<Event> events = new ArrayList<>();
        for(EventEntity event: eventsEntities)
            events.add(Event.toModel(event));
        return events;
    }
    public List<EventEntity> filterFaculty(List<EventEntity> events, List<String> faculties){
        List<EventEntity> filterEvents = new ArrayList<>();
        for(String faculty : faculties)
            for(EventEntity event : events)
                if(event.getFaculties().contains(faculty) || event.getFaculties().contains("Все факультеты"))
                    filterEvents.add(event);
        return filterEvents.stream().distinct().collect(Collectors.toList());
    }

    public List<EventEntity> filterType(List<EventEntity> events, List<String> types){
        List<EventEntity> filterEvents = new ArrayList<>();
        for(String type : types)
            for(EventEntity event : events)
                if(type.equals(event.getType()))
                    filterEvents.add(event);
        return filterEvents;
    }

    public List<EventEntity> filterVisit(List<EventEntity> events, List<String> visits){
        List<EventEntity> filterEvents = new ArrayList<>();
        for(String visit : visits)
            for(EventEntity event : events)
                if(visit.equals(event.getVisit()))
                    filterEvents.add(event);
        return filterEvents;
    }

    public List<Event> filterAll(List<EventEntity> events, Filter filter){
        if(!filter.getFaculties().isEmpty() && !filter.getFaculties().contains("Все факультеты"))//Проверить с пустым фильтром факультеты!!!Работает
            events = this.filterFaculty(events, filter.getFaculties());
        if(!filter.getTypes().isEmpty())
            events = this.filterType(events, filter.getTypes());
        if(!filter.getVisits().isEmpty())
            events = this.filterVisit(events, filter.getVisits());
        return listToModel(events);
    }
    public EventDetailed getOne(int id) throws EventNotFoundedException {
        EventEntity event = eventRepo.findById(id).orElseThrow(() -> new EventNotFoundedException("Мероприятие не найдено"));
        return EventDetailed.toModel(event);
    }

}

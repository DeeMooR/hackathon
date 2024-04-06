package com.example.Backend.controller;

import com.example.Backend.Filter;
import com.example.Backend.entity.EventEntity;
import com.example.Backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {""})
@RestController
@RequestMapping("/events")//!!!Диме сказать
public class EventController {
    @Autowired
    private EventService eventService;
    @PostMapping("/create")
    public ResponseEntity create(@RequestBody EventEntity event){
        try {
            return ResponseEntity.ok(eventService.create(event));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PutMapping("/update")
    public ResponseEntity updateUser(@RequestBody EventEntity event, @RequestParam int id){
        try {
            return ResponseEntity.ok(eventService.update(event, id));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PatchMapping("/results")
    public ResponseEntity setResults(@RequestBody String results, @RequestParam int id){
        try {
            return ResponseEntity.ok(eventService.setResults(results, id));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PatchMapping("/link")//то ли?
    public ResponseEntity setArchive(@RequestBody String link, @RequestParam int id){
        try {
            return ResponseEntity.ok(eventService.setArchive(link, id));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("/all")
    public ResponseEntity getEvents(){
        try {
            return ResponseEntity.ok(eventService.getEvents());
        } catch(Exception e){
            return ResponseEntity.badRequest().body("Произошла ошибка"+ e.getMessage());
        }
    }

    @GetMapping("/past30days")
    public ResponseEntity past30days(){
        try {
            return ResponseEntity.ok(eventService.getForPast30days());
        } catch(Exception e){
            return ResponseEntity.badRequest().body("Произошла ошибка"+ e.getMessage());
        }
    }
    @GetMapping("/next")
    public ResponseEntity nextEvents(){
        try {
            return ResponseEntity.ok(eventService.getNext());
        } catch(Exception e){
            return ResponseEntity.badRequest().body("Произошла ошибка"+ e.getMessage());
        }
    }

    @GetMapping("/past30days/filter")
    public ResponseEntity past30daysFilter(@RequestBody Filter filter){
        try {
            return ResponseEntity.ok(eventService.getForPast30days(filter));
        } catch(Exception e){
            return ResponseEntity.badRequest().body("Произошла ошибка"+ e.getMessage());
        }
    }

    @GetMapping("/next/filter")
    public ResponseEntity nextEventsFilter(@RequestBody Filter filter){
        try {
            return ResponseEntity.ok(eventService.getNext(filter));
        } catch(Exception e){
            return ResponseEntity.badRequest().body("Произошла ошибка"+ e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteEvent(@RequestParam int id){
        try {
            return  ResponseEntity.ok(eventService.delete(id));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }
}

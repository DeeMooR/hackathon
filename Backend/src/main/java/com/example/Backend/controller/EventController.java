package com.example.Backend.controller;

import com.example.Backend.Filter;
import com.example.Backend.entity.EventEntity;
import com.example.Backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
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

    @PatchMapping("/results")//не работает//Починил
    public ResponseEntity setResults(@RequestBody String results, @RequestParam int id){
        try {
            return ResponseEntity.ok(eventService.setResults(results, id));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PatchMapping("/link")//не работает//Починил
    public ResponseEntity setArchive(@RequestBody String link, @RequestParam int id){
        try {
            return ResponseEntity.ok(eventService.setArchive(link, id));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("/all")//не работает//Починил
    public ResponseEntity getEvents(){
        try {
            return ResponseEntity.ok(eventService.getEvents());
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("/past")//не работает//Починил
    public ResponseEntity pastEvents(){
        try {
            return ResponseEntity.ok(eventService.getPast());
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }
    @GetMapping("/next")//не работает//Починил
    public ResponseEntity nextEvents(){
        try {
            return ResponseEntity.ok(eventService.getNext());
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("/past/top")
    public ResponseEntity pastTop(){
        try {
            return ResponseEntity.ok(eventService.getPast("top"));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }
    @GetMapping("/next/top")
    public ResponseEntity nextTopEvents(){
        try {
            return ResponseEntity.ok(eventService.getNext("top"));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/past/filter")
    public ResponseEntity pastFilter(@RequestBody Filter filter){
        try {
            return ResponseEntity.ok(eventService.getPast(filter));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/next/filter")
    public ResponseEntity nextEventsFilter(@RequestBody Filter filter){
        try {
            return ResponseEntity.ok(eventService.getNext(filter));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @DeleteMapping("/delete")//не работает//Починил
    public ResponseEntity deleteEvent(@RequestParam int id){
        try {
            return  ResponseEntity.ok(eventService.delete(id));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity one(@PathVariable int id){
        try {
            return ResponseEntity.ok(eventService.getOne(id));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/past/admin")
    public ResponseEntity pastFilter(@RequestParam String name){
        try {
            return ResponseEntity.ok(eventService.getPast(name));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/next/admin")
    public ResponseEntity nextEventsFilter(@RequestParam String name){
        try {
            return ResponseEntity.ok(eventService.getNext(name));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }
}

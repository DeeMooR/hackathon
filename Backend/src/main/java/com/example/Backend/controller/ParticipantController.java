package com.example.Backend.controller;

import com.example.Backend.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {""})//Дописывать адресс фронта
@RestController
@RequestMapping("/participants")//!!!Диме сказать
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;
    @PostMapping("/add")
    public ResponseEntity add(@RequestBody List<String> participants, @RequestParam int id){
        try {
            return ResponseEntity.ok(participantService.add(participants, id));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("/get")
    public ResponseEntity getParticipants(@RequestParam int id){
        try {
            return ResponseEntity.ok(participantService.getParticipants(id));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }
    }
}

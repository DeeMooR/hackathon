package com.example.Backend.controller;

import com.example.Backend.entity.TeamEntity;
import com.example.Backend.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/teams")//!!!Диме сказать
public class TeamController {

    @Autowired
    private TeamService participantService;
    @PostMapping()
    public ResponseEntity add(@RequestBody TeamEntity team, @RequestParam int eventId){
        try {
            return ResponseEntity.ok(participantService.add(team, eventId));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping()
    public ResponseEntity getParticipants(@RequestParam int eventId){
        try {
            return ResponseEntity.ok(participantService.getTeams(eventId));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }
}

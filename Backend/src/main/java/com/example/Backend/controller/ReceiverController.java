package com.example.Backend.controller;

import com.example.Backend.entity.ReceiverEntity;
import com.example.Backend.service.ReceiverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/receiver")//!!!Диме сказать
public class ReceiverController {

    @Autowired
    private ReceiverService receiverService;
    @PostMapping("/new")
    public ResponseEntity authorization(@RequestBody ReceiverEntity receiver) {
        try {
            return ResponseEntity.ok(receiverService.add(receiver));
        } catch(Exception e){
            return ResponseEntity.badRequest().body(false);
        }
    }
}

package com.example.Backend.service;

import com.example.Backend.exception.EventNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantService {

    @Autowired
    private EventRepo userRepo;

    public boolean add(List<String> participants,int id) throws EventNotFoundException {
        if(!eventRepo.existsById(id))



        //put code here
        //don't forget about custom exception
        return true;
    }

    public boolean getParticipants(int id) throws EventNotFoundException {
        //put code here
        //don't forget about custom exception
        return true;
    }
}

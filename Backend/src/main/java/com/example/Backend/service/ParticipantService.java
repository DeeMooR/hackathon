package com.example.Backend.service;

import com.example.Backend.exception.EventNotFoundedException;
import com.example.Backend.repository.EventRepo;
import com.example.Backend.repository.ParticipantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepo participantRepoRepo;
    @Autowired
    private EventRepo eventRepo;

    public boolean add(List<String> participants,int id) throws EventNotFoundedException {
        if(!eventRepo.existsById(id))
            throw new EventNotFoundedException("event not founded");
        //put code here
        //don't forget about custom exception
        return true;
    }

    public boolean getParticipants(int id) throws EventNotFoundedException {
        //put code here
        //don't forget about custom exception
        return true;
    }
}

package com.example.Backend.service;

import com.example.Backend.entity.EventEntity;
import com.example.Backend.entity.ParticipantEntity;
import com.example.Backend.exception.EventNotFoundedException;
import com.example.Backend.model.Participant;
import com.example.Backend.repository.EventRepo;
import com.example.Backend.repository.ParticipantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepo participantRepo;
    @Autowired
    private EventRepo eventRepo;

    public boolean add(List<ParticipantEntity> participants,int id) throws EventNotFoundedException {
        if(!eventRepo.existsById(id))
            throw new EventNotFoundedException("event not founded");
        EventEntity event = eventRepo.findById(id).get();
        for(ParticipantEntity participant : participants){
            participant.setEvent(event);
            participantRepo.save(participant);
        }
        return true;
    }

    public List<String> getParticipants(int id) throws EventNotFoundedException {
        if(!eventRepo.existsById(id))
            throw new EventNotFoundedException("event not founded");
        List<String> participants = new ArrayList<>();
        for(ParticipantEntity participant : eventRepo.findById(id).get().getParticipants()){
            participants.add(Participant.toModel(participant).getFullNameAndGroup());
        }
        return participants;
    }
}

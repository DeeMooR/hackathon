package com.example.Backend.service;

import com.example.Backend.entity.EventEntity;
import com.example.Backend.entity.ParticipantEntity;
import com.example.Backend.entity.TeamEntity;
import com.example.Backend.exception.EventNotFoundedException;
import com.example.Backend.model.Participant;
import com.example.Backend.model.Team;
import com.example.Backend.repository.EventRepo;
import com.example.Backend.repository.ParticipantRepo;
import com.example.Backend.repository.TeamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeamService {

    @Autowired
    private TeamRepo teamRepo;
    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private ParticipantRepo participantRepo;

    public boolean add(TeamEntity team, int eventId) throws EventNotFoundedException {
        if(!eventRepo.existsById(eventId))
            throw new EventNotFoundedException("event not founded");
        EventEntity event = eventRepo.findById(eventId).get();
        team.setEvent(event);
        teamRepo.save(team);
        //for(ParticipantEntity participant : team.getParticipants()){//не уверен надо ли
        //participant.setTeam(team);
        //participantRepo.save(participant);
        //}
        return true;
    }

    public List<Team> getTeams(int id) throws EventNotFoundedException {
        if(!eventRepo.existsById(id))
            throw new EventNotFoundedException("event not founded");
        List<Team> teams = new ArrayList<>();
        for(TeamEntity team : eventRepo.findById(id).get().getTeams()){
            teams.add(Team.toModel(team));
        }
        return teams;
    }
}

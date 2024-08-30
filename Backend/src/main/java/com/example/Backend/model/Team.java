package com.example.Backend.model;

import com.example.Backend.entity.ParticipantEntity;
import com.example.Backend.entity.TeamEntity;

import java.util.ArrayList;
import java.util.List;

public class Team {

    private String team;
    private List<Participant> members;

    public static Team toModel(TeamEntity entity){
        return new Team(entity);
    }

    public Team (TeamEntity entity){
        team = entity.getTeam();
        members = new ArrayList<>();
        for(ParticipantEntity participant : entity.getMembers())
            members.add(Participant.toModel(participant));
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public List<Participant> getMembers() {
        return members;
    }

    public void setMembers(List<Participant> members) {
        this.members = members;
    }
}

package com.example.Backend.service;

import com.example.Backend.entity.ReceiverEntity;
import com.example.Backend.exception.ReceiverAlreadyExists;
import com.example.Backend.repository.ReceiverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class ReceiverService{

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ReceiverRepo receiverRepo;
    public boolean add(ReceiverEntity receiver) throws ReceiverAlreadyExists {
        if (receiverRepo.existsById(receiver.getEmail())){
            throw new ReceiverAlreadyExists("Получатель уже существует");
        }
        receiverRepo.save(receiver);
        return true;
    }

}

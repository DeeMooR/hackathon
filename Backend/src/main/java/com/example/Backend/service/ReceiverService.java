package com.example.Backend.service;

import com.example.Backend.entity.EventEntity;
import com.example.Backend.entity.ReceiverEntity;
import com.example.Backend.exception.ReceiverAlreadyExists;
import com.example.Backend.repository.ReceiverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;


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
        send(receiver.getEmail());
        return true;
    }
    public void send(String emailTo) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(emailTo);
        mailMessage.setSubject("Теперь ты следишь за BSUIR \uD83D\uDE0E");
        mailMessage.setText("Спасибо, что подписался на рассылку BSUIR! Мы будем держать тебя в курсе всех наших мероприятий и новостей.");
        mailSender.send(mailMessage);
    }


}

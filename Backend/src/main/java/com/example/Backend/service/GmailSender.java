package com.example.Backend.service;

import com.example.Backend.entity.EventEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class GmailSender {
    @Autowired
    private JavaMailSender mailSender;

    public void send(String emailTo, EventEntity event) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(emailTo);
        mailMessage.setSubject(createTheme(event));
        mailMessage.setText(createMessage(event));
        mailSender.send(mailMessage);
    }

    public String createTheme(EventEntity event){
        Random random = new Random();
        int message = random.nextInt(3);
        String text = "";
        switch (message){
            case 0 -> text = "Привет от BSUIR \uD83D\uDC4B";
            case 1 -> text = "Подъем студент, BSUIR ждет тебя \uD83D\uDE0A";
            case 2 -> text = "Пора отдохнуть вместе с BSUIR \uD83C\uDF89";
        }
        return text;
    }

    public String createMessage(EventEntity event){
        return event.toString();
    }


}
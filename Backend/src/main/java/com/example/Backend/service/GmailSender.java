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
            case 0 -> text = "Привет от BSUIR";
            case 1 -> text = "Подъем студент, BSUIR ждет тебя";
            case 2 -> text = "Пора отдохнуть вместе с BSUIR";
        }
        return text;
    }

    public String createMessage(EventEntity event){//Надо в EventEntity переопределить toString и сделать норм сообщение
        return "Дорогой студент, тебя ждет " + event.getTitle() + "\nГде: " + event.getLocation() + ",\nКогда: " + event.getDate().toString() + " " + event.getTime() + "\nЗа подробностями оброщайся на наш сайт идли социальные сети";// попробовать добавить ссылку
    }


}
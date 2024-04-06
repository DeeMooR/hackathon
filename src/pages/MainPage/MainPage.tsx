import React from 'react'
import MiniCard from 'src/components/MiniCard'
import './MainPage.css'
import Header from 'src/components/Header'

import main from "src/img/main.png"

const MainPage = () => {

  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="mainSection">
          <div className="mainSection__info">
            <h1><span>Расписание</span> мероприятий в БГУИР</h1>
            <div className="mainSection__text-button">
              <p className='mainSection__text'>Список мероприятий всех типов, от всех факультетов, с гибкой сортировкой и возможностью зарегистрироваться</p>
              <button className='button mainSection__button'>Смотреть ближайшие события</button>
            </div>
          </div>
          <img src={main} className='mainSection__image' alt="bsuir" />
        </section>
        <section className='eventsSection'>
          <h2>Ближайшие мероприятия</h2>
          <div className="eventsSection__events">
            <MiniCard addClass='event_1'/>
            <MiniCard addClass='event_2'/>
            <MiniCard addClass='event_3'/>
          </div>
          <button className='button eventsSection__button'>Смотреть все мероприятия</button>
        </section>
        <section className='eventsSection'>
          <h2>Прошедшие мероприятия</h2>
          <div className="eventsSection__events">
            <MiniCard addClass='event_1'/>
            <MiniCard addClass='event_2'/>
            <MiniCard addClass='event_3'/>
          </div>
          <button className='button eventsSection__button'>Смотреть все мероприятия</button>
        </section>
      </div>
    </>
  )
}

export default MainPage

import React from 'react'
import MiniCard from 'src/components/MiniCard'
import './MainPage.css'
import Header from 'src/components/Header'

import main from "src/img/main.png"
import Newsletter from 'src/components/Newsletter'
import Footer from 'src/components/Footer'

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
            <MiniCard/>
            <MiniCard/>
            <MiniCard addClass='event_3'/>
          </div>
          <button className='button eventsSection__button'>Смотреть будущие мероприятия</button>
        </section>
        <section className='eventsSection'>
          <h2>Прошедшие мероприятия</h2>
          <div className="eventsSection__events">
            <MiniCard/>
            <MiniCard/>
            <MiniCard addClass='event_3'/>
          </div>
          <button className='button eventsSection__button'>Смотреть прошлые мероприятия</button>
        </section>
        <section className="mapSection">
          <h2>Карта корпусов</h2>
          <iframe 
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A8df2e81712e171e182d9da4acd2de8361ccee6c301d8d1e327261d367f98df93&amp;source=constructor" 
            className='mapSection__map'
          />
        </section>
      </div>
      <Newsletter/>
      <Footer/>
    </>
  )
}

export default MainPage

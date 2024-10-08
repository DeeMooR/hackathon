import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { clearMainMessages, getEventsTopAction, getMainEventsTopSelector, getMainSelector, useAppDispatch, useAppSelector } from 'src/store';
import { Header, Footer, Newsletter, EventsTop, Notification } from 'src/components';
import { mainImage } from 'src/assets';
import './MainPage.css'

export const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { errorMessage, errorLoadingEventMessage } = useAppSelector(getMainSelector);
  const { eventsNextTop, eventsPastTop } = useAppSelector(getMainEventsTopSelector);
  
  useEffect(() => {
    dispatch(getEventsTopAction());
  }, [])

  const clickOpenEventsNext = () => {
    navigate('/next');
  }

  const clearMessages = () => {
    dispatch(clearMainMessages());
  }

  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="mainSection">
          <div className="mainSection__info">
            <h1><span>Расписание</span> мероприятий в БГУИР</h1>
            <div className="mainSection__text-button">
              <p className='mainSection__text'>Список мероприятий всех типов, от всех факультетов, с гибкой сортировкой</p>
              <button className='button mainSection__button' onClick={clickOpenEventsNext}>Смотреть ближайшие события</button>
            </div>
          </div>
          <img src={mainImage} className='mainSection__image' alt="bsuir" />
        </section>
        <section className='eventsSection'>
          <EventsTop eventsShow={eventsNextTop} type='next' />
        </section>
        <section className='eventsSection'>
          <EventsTop eventsShow={eventsPastTop} type='past' />
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
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
      {errorLoadingEventMessage && <Notification type='error' message={errorLoadingEventMessage} clearMessage={clearMessages} />}
    </>
  )
}

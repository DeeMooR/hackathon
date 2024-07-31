import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getEvents, getEventsNextAction, getEventsPastAction, useAppDispatch, useAppSelector } from 'src/store';
import { Header, Footer, Newsletter, Tabs, Filters, MiniCard } from 'src/components';
import { IEvent } from 'src/interface'
import './EventsPage.css'

interface IEventsPage {
  type: string
}

export const EventsPage:FC<IEventsPage> = ({type}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { eventsNext, eventsPast } = useAppSelector(getEvents);

  const events = (type === 'next') ? eventsNext : eventsPast;
  const word = (type === 'next') ? 'Ближайшие' : 'Прошедшие';

  useEffect(() => {
    dispatch(getEventsNextAction());
    dispatch(getEventsPastAction());
  }, [])

  const openMainPage = () => {
    navigate('/');
  }

  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="eventsPage">
          <p className='crumbs' onClick={openMainPage}>Главная /</p>
          <h1><span>{word}</span> мероприятия</h1>
          <Tabs />
          <Filters />
          <div className="eventsPage__events">
            {events.map((obj: IEvent) => 
              <MiniCard obj={obj} key={obj.id}/>
            )}
          </div>
        </section>
      </div>
      <Newsletter/>
      <Footer/>
    </>
  )
}

import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getEvents, useAppDispatch, useAppSelector } from 'src/store';
import { Header, Footer, Newsletter, Tabs, Filters, MiniCard } from 'src/components';
import { IEvent } from 'src/interface'
import { EventsPageAllEvents, EventsPageData } from './config';
import './EventsPage.css'

interface IEventsPage {
  type: 'next' | 'past',
}

export const EventsPage:FC<IEventsPage> = ({type}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { eventsNext, eventsPast } = useAppSelector(getEvents);

  const { titleWord, actionGetEvents } = EventsPageData[type];
  const events = EventsPageAllEvents[type]({eventsNext, eventsPast});

  useEffect(() => {
    dispatch(actionGetEvents);
  }, [type])

  const openMainPage = () => {
    navigate('/');
  }

  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="eventsPage">
          <p className='crumbs' onClick={openMainPage}>Главная /</p>
          <h1><span>{titleWord}</span> мероприятия</h1>
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

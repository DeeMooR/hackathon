import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Header, Footer, Newsletter, Tabs, Filters, MiniCard } from 'src/components';
import { IEvent } from 'src/interface'
import './EventsPage.css'
import { getEvents, useAppSelector } from 'src/store';

interface IEventsPage {
  type: string
}

export const EventsPage:FC<IEventsPage> = ({type}) => {
  const navigate = useNavigate();
  const { eventsNext, eventsPast } = useAppSelector(getEvents);

  const events = (type === 'next') ? eventsNext : eventsPast;
  const word = (type === 'next') ? 'Ближайшие' : 'Прошедшие';

  const [tab, setTab] = useState<string>('Все факультеты');
  const [types, setTypes] = useState<string[]>([]);
  const [visits, setVisits] = useState<string[]>([]);

  const onClickTab = (value: string) => {
    console.log(value)
    setTab(value);
  }
  const clickType = (value: string) => {
    if (types.includes(value)) {
      const update = types.filter(v => v !== value);
      setTypes(update)
    }
    console.log(types, visits)
  }
  const clickVisit = (value: string) => {
    if (visits.includes(value)) {
      const update = visits.filter(v => v !== value);
      setVisits(update)
    }
    console.log(types, visits)
  }

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
          <Tabs tab={tab} onClickTab={onClickTab}/>
          <Filters types={types} clickType={() => clickType} visits={visits} clickVisit={() => clickVisit}/>
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

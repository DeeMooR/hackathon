import React, { FC, useState } from 'react'
import MiniCard from 'src/components/MiniCard'
import './EventsPage.css'
import Header from 'src/components/Header'

import main from "src/img/main.png"
import Newsletter from 'src/components/Newsletter'
import Footer from 'src/components/Footer'
import Tabs from 'src/components/Tabs'
import Filters from 'src/components/Filters'
import { useSelector } from 'react-redux'
import { IEvent } from 'src/interface'

interface IEventsPage {
  type: string
}

const EventsPage:FC<IEventsPage> = ({type}) => {
  window.scrollTo(0, 0);
  const {eventsNext, eventsPast} = useSelector((state: any) => state.main);

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

  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="eventsPage">
          <p className='crumbs'>Главная /</p>
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

export default EventsPage

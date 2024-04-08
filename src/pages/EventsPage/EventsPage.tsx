import React, { FC } from 'react'
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
  const {eventsNext, eventsPast} = useSelector((state: any) => state.main);

  const events = (type === 'next') ? eventsNext : eventsPast;
  const word = (type === 'next') ? 'Ближайшие' : 'Прошедшие';

  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="eventsPage">
          <p className='crumbs'>Главная /</p>
          <h1><span>{word}</span> мероприятия</h1>
          <Tabs/>
          <Filters/>
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

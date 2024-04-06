import React, { FC } from 'react'
import MiniCard from 'src/components/MiniCard'
import './EventsPage.css'
import Header from 'src/components/Header'

import main from "src/img/main.png"
import Newsletter from 'src/components/Newsletter'
import Footer from 'src/components/Footer'
import Tabs from 'src/components/Tabs'

interface IEventsPage {
  type: string
}

const EventsPage:FC<IEventsPage> = ({type}) => {
  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="eventsPage">
          <p className='eventsPage__crumbs'>Главная /</p>
          <h1><span>Ближайшие</span> мероприятия</h1>
          <Tabs/>
          {/* <div className='eventsPage__filters'>
            <Filter/>
            <Filter/>
          </div> */}
          <div className="eventsPage__events">
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
          </div>
        </section>
      </div>
      <Newsletter/>
      <Footer/>
    </>
  )
}

export default EventsPage

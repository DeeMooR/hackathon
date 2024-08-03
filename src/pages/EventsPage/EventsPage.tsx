import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getEvents, setEventsPage, useAppDispatch, useAppSelector } from 'src/store';
import { Header, Footer, Newsletter, Tabs, Filters, MiniCard, Loading, ShowLoading } from 'src/components';
import { IShortEvent } from 'src/interface'
import { ActionGetEvents } from 'src/helpers';
import { EventsPageData } from './config';
import './EventsPage.css'

interface IEventsPage {
  page: 'next' | 'past',
}

export const EventsPage:FC<IEventsPage> = ({page}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { events, isLoading } = useAppSelector(getEvents);
  const showLoading = ShowLoading(isLoading);
  const { titleWord } = EventsPageData[page];

  useEffect(() => {
    dispatch(setEventsPage(page));
    dispatch(ActionGetEvents[page]);
  }, [page])

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
            {showLoading ? (
              <Loading />
            ) : (
              events.map((obj: IShortEvent) => (
                <MiniCard obj={obj} key={obj.id} />
              ))
            )}
          </div>
        </section>
      </div>
      <Newsletter/>
      <Footer/>
    </>
  )
}

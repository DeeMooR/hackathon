import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getEventsSelector, setEventsPage, clearEventsMessages, useAppDispatch, useAppSelector } from 'src/store';
import { Header, Footer, Newsletter, Tabs, Filters, MiniCard, Loading, Wait, Notification } from 'src/components';
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
  const { events, isLoading, errorMessage } = useAppSelector(getEventsSelector);
  const { titleWord } = EventsPageData[page];
  const wait = Wait(isLoading);

  useEffect(() => {
    dispatch(setEventsPage(page));
    dispatch(ActionGetEvents[page]);
  }, [page])

  const openMainPage = () => {
    navigate('/');
  }

  const clearMessages = () => {
    dispatch(clearEventsMessages());
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
            {wait ? (
              <Loading />
            ) : (
              events.length ? (
                events.map((obj: IShortEvent) => (
                  <MiniCard obj={obj} key={obj.id} />
                ))
              ) : (
                <h4 className='eventsPage__empty'>Мероприятий не найдено</h4>
              )
            )}
          </div>
        </section>
      </div>
      <Newsletter/>
      <Footer/>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </>
  )
}

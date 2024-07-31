import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEvents, useAppSelector } from 'src/store'
import { Loading, MiniCard } from 'src/components'
import { IEvent } from 'src/interface'
import { EventsTopData } from './config'
import './EventsTop.css'

interface IEventsTop {
  eventsShow: IEvent[],
  type: 'next' | 'past',
}

export const EventsTop:FC<IEventsTop> = ({ eventsShow, type }) => {
  const navigate = useNavigate();
  const { isLoading } = useAppSelector(getEvents);
  const { title, navigatePage, buttonText, emptyText } = EventsTopData[type];

  const onClickButton = () => {
    navigate(navigatePage);
  }

  return (
    <section className='eventsTop'>
      <h2>{title}</h2>
      {isLoading ? <Loading /> : (
        <>
          {eventsShow.length ? (
            <>
              <div className="eventsTop__events">
                {eventsShow.map((obj: IEvent, i: number) => 
                  <MiniCard obj={obj} key={i} />
                )}
              </div>
              <button className='button eventsTop__button' onClick={onClickButton}>{buttonText}</button>
            </>
          ) : (
            <h4 className='eventsTop__empty'>{emptyText}</h4>
          )}
        </>
      )}
    </section>
  )
}


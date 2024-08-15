import React, { FC } from 'react'
import { getAdminSelector, useAppSelector } from 'src/store'
import { Loading, MiniCard, ShowLoading } from 'src/components'
import { IShortEvent } from 'src/interface'
import { EventsAdminData } from './config'
import './EventsAdmin.css'

interface IEventsAdmin {
  eventsShow: IShortEvent[],
  type: 'next' | 'past',
}

export const EventsAdmin:FC<IEventsAdmin> = ({ eventsShow, type }) => {
  const { isLoading } = useAppSelector(getAdminSelector);
  const showLoading = ShowLoading(isLoading);
  const { title, emptyText } = EventsAdminData[type];

  return (
    <section className='eventsAdmin'>
      <h2>{title}</h2>
      {showLoading ? <Loading /> : (
        eventsShow.length ? (
          <div className="eventsAdmin__events">
            {eventsShow.map((event: IShortEvent, i: number) =>
              <MiniCard obj={event} key={i} isEdit />
            )}
          </div>
        ) : (
          <h4 className='eventsAdmin__empty'>{emptyText}</h4>
        )
      )}
    </section>
  )
}


import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconText } from 'src/components';
import { formatDate, isPast } from 'src/helpers'
import { IShortEvent } from 'src/interface'
import { calenderIcon, locationIcon, timeIcon } from 'src/assets';
import { BackgroundImage, Container } from 'src/styled'
import './MiniCard.css'

interface IMiniCard {
  obj: IShortEvent,
  edit?: boolean,
  show_users?: boolean,
  clickShowMembers?: (id: number) => void,
  clickChangeEvent?: (id: number) => void
}

export const MiniCard:FC<IMiniCard> = ({obj, edit, show_users, clickShowMembers, clickChangeEvent}) => {
  const navigate = useNavigate();
  const { id, date, faculties, location, photo, time, title } = obj;

  const openEventPage = () => {
    navigate(`/events/${id}`);
  }
  
  return (
    <div className='mini-card'>
      <Container>
        <BackgroundImage image={photo} />
      </Container>
      <div className='mini-card__description'>
        <h3 className='mini-card__title'>{title}</h3>
        <IconText icon={calenderIcon} text={formatDate(date)} isBlueBox />
        <IconText icon={locationIcon} text={location} />
        <IconText icon={timeIcon} text={time} />
        <p>{faculties.join(', ')}</p>
      </div>
      <div className="mini-card__buttons">
        {!edit && !show_users && 
          <button className='second-button' onClick={openEventPage}>Подробнее</button>
        }
        {edit && <button className='second-button' onClick={() => clickChangeEvent?.(obj.id)}>Редактировать мероприятие</button>}
        {show_users && <button className='button' onClick={() => clickShowMembers?.(obj.id)}>Смотреть участников</button>}
      </div>
    </div>
  )
}

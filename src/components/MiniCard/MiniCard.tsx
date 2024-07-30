import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconText } from 'src/components';
import { formatDate, isPast } from 'src/helpers'
import { IEvent } from 'src/interface'
import { calenderIcon, locationIcon, timeIcon } from 'src/assets';
import { BackgroundImage, Container } from 'src/styled'
import './MiniCard.css'

interface IMiniCard {
  obj: IEvent,
  edit?: boolean,
  show_users?: boolean,
  clickShowMembers?: (id: number) => void,
  clickChangeEvent?: (id: number) => void
}

export const MiniCard:FC<IMiniCard> = ({obj, edit, show_users, clickShowMembers, clickChangeEvent}) => {
  const navigate = useNavigate();

  const openEventPage = () => {
    if (isPast(obj.date)) navigate(`/past/${obj.id}`);
    else navigate(`/next/${obj.id}`);
  }
  
  return (
    <div className='mini-card'>
      <Container>
        <BackgroundImage image={obj.photo} />
      </Container>
      <div className='mini-card__description'>
        <h3 className='mini-card__title'>{obj.title}</h3>
        <IconText icon={calenderIcon} text={formatDate(obj.date)} isBlueBox />
        <IconText icon={locationIcon} text={obj.location} />
        <IconText icon={timeIcon} text={obj.time} />
        <p>{obj.faculties.join(', ')}</p>
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

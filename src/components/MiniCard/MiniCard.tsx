import React, { FC } from 'react'
import './MiniCard.css'
import { BackgroundImage, Container } from 'src/styled'

import calendar from "src/img/icons/Calender.svg"
import location from "src/img/icons/Location.svg"
import time from "src/img/icons/Time.svg"
import IconText from '../IconText'
import { defaultObj, formatDate } from 'src/helpers'
import { IEvent } from 'src/interface'
import { useNavigate } from 'react-router-dom'
const hack = 'https://i.ibb.co/k5HzGCR/news-6.png'

interface IMiniCard {
  obj?: IEvent,
  isDeleteSmall?: boolean,
  edit?: boolean,
  show_users?: boolean,
  clickShowMembers?: () => void,
  clickChangeEvent?: () => void
}

const MiniCard:FC<IMiniCard> = ({obj = defaultObj, isDeleteSmall, edit, show_users, clickShowMembers, clickChangeEvent}) => {
  const navigate = useNavigate();

  const openEventPage = () => {
    navigate(`/next/${obj.id}`);
  }
  
  return (
    <div className={`mini-card ${isDeleteSmall ? 'delete-small' : ''}`}>
      <Container>
        <BackgroundImage image={obj.photo} />
      </Container>
      <div className='mini-card__description'>
        <h3 className='mini-card__title'>{obj.title}</h3>
        <IconText icon={calendar} text={formatDate(obj.date)} isBlueBox />
        <IconText icon={location} text={obj.location} />
        <IconText icon={time} text={obj.time} />
        <p>{obj.faculties.join(', ')}</p>
      </div>
      <div className="mini-card__buttons">
        {!edit && !show_users && 
          <button className='second-button' onClick={openEventPage}>Подробнее</button>
        }
        {edit && <button className='second-button' onClick={clickChangeEvent}>Редактировать мероприятие</button>}
        {show_users && <button className='button' onClick={clickShowMembers}>Смотреть участников</button>}
      </div>
    </div>
  )
}

export default MiniCard

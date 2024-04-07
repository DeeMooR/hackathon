import React, { FC } from 'react'
import './MiniCard.css'
import { BackgroundImage, Container } from 'src/styled'

import calendar from "src/img/icons/Calender.svg"
import location from "src/img/icons/Location.svg"
import time from "src/img/icons/Time.svg"
import IconText from '../IconText'
import { formatDate } from 'src/helpers'
const hack = 'https://i.ibb.co/k5HzGCR/news-6.png'

interface IMiniCard {
  addClass?: string
}

const MiniCard:FC<IMiniCard> = ({addClass = ''}) => {
  const date = new Date('2024-04-05');

  return (
    <div className={`mini-card ${addClass}`}>
      <Container>
        <BackgroundImage image={hack} />
      </Container>
      <div className='mini-card__description'>
        <h3 className='mini-card__title'>Хакатон FCADHACK</h3>
        <IconText icon={calendar} text={formatDate(date)} isBlueBox />
        <IconText icon={location} text='2к, актовый зал' />
        <IconText icon={time} text='15:00' />
        <p>Все факультеты</p>
      </div>
      <button className='second-button mini-card__button'>Подробнее</button>
    </div>
  )
}

export default MiniCard

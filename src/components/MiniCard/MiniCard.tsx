import React from 'react'
import './MiniCard.css'
import { BackgroundImage } from './styled'

const hack = 'https://i.ibb.co/k5HzGCR/news-6.png'

const MiniCard = () => {
  return (
    <div className='mini-card'>
      <BackgroundImage image={hack} />
      <div className='mini-card__description'>
        <h3 className='mini-card__title'>Хакатон FCADHACK</h3>
        <div className="mini-card__icon-text mini-card__blue-box">
          <div className='mini-card__icon icon-calendar'/>
          <p>5-8 апреля 2024</p>
        </div>
        <div className="mini-card__icon-text">
          <div className='mini-card__icon icon-location'/>
          <p>2к, актовый зал</p>
        </div>
        <div className="mini-card__icon-text">
          <div className='mini-card__icon icon-time'/>
          <p>15:00</p>
        </div>
        <p>Все факультеты</p>
      </div>
      <button className='second-button mini-card__button'>Подробнее</button>
    </div>
  )
}

export default MiniCard

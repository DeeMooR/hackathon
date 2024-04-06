import React from 'react'
import './Newsletter.css'

import email from "src/img/email_image.png"

const Newsletter = () => {
  return (
    <div className='newsletter'>
      <div className="wrapper">
        <div className="newsletter__photo-info">
          <img src={email} className='newsletter__photo' alt="photo" />
          <div className="newsletter__text-fields">
            <div className="newsletter__text">
              <h2>Узнавайте первым о новых событиях</h2>
              <p>Введите почту и получайте уведомления о мероприятиях в БГУИР</p>
            </div>
            <div className="newsletter__fields">
              <input type="email" className='newsletter__input' placeholder='Эл. почта' />
              <button className='second-button newsletter__button'>Получать уведомления на почту</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsletter

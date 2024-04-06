import React from 'react'
import './Footer.css'

import logo_white from "src/img/icons/Logo-white.svg"

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="wrapper">
        <div className="footer__left">
          <img src={logo_white} className='footer__logo' alt="logo" />
          <h3>Белорусский государственный университет информатики и радиоэлектроники</h3>
        </div>
        <div className="footer__right">
          <div className="footer__nav">
            <div className="footer__nav-events">
              <p>Ближайшие мероприятия</p>
              <p>Прошедшие мероприятия</p>
            </div>
            <p>Контакты</p>
          </div>
          <p className='footer__copyright'>© ЦИИР БГУИР, 2002-2024</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

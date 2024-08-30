import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logoWhiteIcon } from 'src/assets';
import './Footer.css'

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className='footer'>
      <div className="wrapper">
        <div className="footer__left">
          <img src={logoWhiteIcon} className='footer__logo' alt="logo" />
          <h3>Белорусский государственный университет информатики и радиоэлектроники</h3>
        </div>
        <div className="footer__right">
          <div className="footer__nav">
            <div className="footer__nav-events">
              <p className='nav__item' onClick={() => navigate('/next')}>Ближайшие мероприятия</p>
              <p className='nav__item' onClick={() => navigate('/past')}>Прошедшие мероприятия</p>
            </div>
            <p className='nav__item' onClick={() => navigate('/contacts')}>Контакты</p>
          </div>
          <p className='footer__copyright'>© ЦИИР БГУИР, 2002-2024</p>
        </div>
      </div>
    </footer>
  )
}

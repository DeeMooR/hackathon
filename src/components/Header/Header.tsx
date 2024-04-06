import React from 'react'
import './Header.css'


import logo from "src/img/icons/Logo.svg"
import map from "src/img/icons/Map.svg"

const Header = () => {
  return (
    <header className='header'>
      <div className="wrapper">
        <img src={logo} className='header__logo' alt="logo" />
        <nav className='header__nav'>
          <a href="#">Ближайшие мероприятия</a>
          <a href="#">Прошедшие мероприятия</a>
          <a href="#">Контакты</a>
        </nav>
        <div className="header__map">
          <img className='header__map-icon' src={map} alt="map" />
          <p className='header__map-text'>Карта корпусов</p>
        </div>
      </div>
    </header>
  )
}

export default Header

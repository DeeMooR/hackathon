import React, { useEffect, useState } from 'react'
import './Header.css'


import logo from "src/img/icons/Logo.svg"
import map from "src/img/icons/Map.svg"
import menu from "src/img/icons/Burger.svg"
import { Link } from 'react-router-dom'
import SlideBar from '../SlideBar'

const Header = () => {
  const [clickMenu, setClickMenu] = useState(false);

  useEffect(() => {
    if (clickMenu) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [clickMenu]);

  return (
    <header className='header'>
      <div className="wrapper">
        <img src={logo} className='header__logo' alt="logo" />
        <nav className='header__nav'>
          <Link to='/'>Ближайшие мероприятия</Link>
          <Link to='/'>Прошедшие мероприятия</Link>
          <Link to='/'>Контакты</Link>
          <Link to='/' className='link-map'>Карта</Link>
        </nav>
        <div className="header__map">
          <img className='header__map-icon' src={map} alt="map" />
          <p className='header__map-text'>Карта корпусов</p>
        </div>
        <img src={menu} alt="menu" className='header__menu' onClick={() => setClickMenu(true)} />
      </div>
      {clickMenu &&
        <SlideBar clickMenu={clickMenu} setClickMenu={setClickMenu} />
      }
    </header>
  )
}

export default Header

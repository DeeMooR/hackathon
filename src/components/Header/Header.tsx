import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SlideBar } from 'src/components';
import { logoIcon, mapIcon, burgerIcon } from 'src/assets';
import './Header.css'

export const Header = () => {
  const navigate = useNavigate();
  const [clickMenu, setClickMenu] = useState(false);

  useEffect(() => {
    if (clickMenu) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [clickMenu]);

  const onClickLogo = () => {
    navigate('/');
  }

  return (
    <header className='header'>
      <div className="wrapper">
        <img src={logoIcon} className='header__logo' onClick={onClickLogo} alt="logo" />
        <nav className='header__nav'>
          <Link to='/next'>Ближайшие мероприятия</Link>
          <Link to='/past'>Прошедшие мероприятия</Link>
          <Link to='/contacts'>Контакты</Link>
          <Link to='/' className='link-map'>Карта</Link>
        </nav>
        <div className="header__map">
          <img className='header__map-icon' src={mapIcon} alt="map" />
          <p className='header__map-text'>Карта корпусов</p>
        </div>
        <img src={burgerIcon} alt="menu" className='header__menu' onClick={() => setClickMenu(true)} />
      </div>
      {clickMenu &&
        <SlideBar clickMenu={clickMenu} setClickMenu={setClickMenu} />
      }
    </header>
  )
}

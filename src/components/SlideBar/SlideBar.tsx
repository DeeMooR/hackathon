import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./SlideBar.css"

import logo from "src/img/icons/Logo.svg"
import close from "src/img/icons/Close.svg"

interface ISlideBar {
    clickMenu: boolean,
    setClickMenu: (value: boolean) => void,
}

const SlideBar:FC<ISlideBar> = ({ clickMenu, setClickMenu }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setClickMenu(false);
  }
  const logoClick = () => {
    navigate('/');
    handleClick();
  }

  return (
    <div className={`slideBar ${clickMenu && 'show'}`} >
      <div className="slideBar__header">
        <img src={logo} alt="logo" onClick={logoClick} />
        <img src={close} alt="cross" onClick={handleClick} />
      </div>
      <div className="slideBar__items">
        <Link to='/' className='slideBar__item' onClick={handleClick}>Ближайшие мероприятия</Link>
        <Link to='/' className='slideBar__item' onClick={handleClick}>Прошедшие мероприятия</Link>
        <Link to='/' className='slideBar__item' onClick={handleClick}>Контакты</Link>
        <Link to='/' className='slideBar__item' onClick={handleClick}>Карта корпусов</Link>
      </div>
    </div>
  )
}

export default SlideBar

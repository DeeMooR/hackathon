import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { logoIcon, crossIcon } from 'src/assets';
import "./SlideBar.css"

interface ISlideBar {
    clickMenu: boolean,
    setClickMenu: (value: boolean) => void,
}

export const SlideBar:FC<ISlideBar> = ({ clickMenu, setClickMenu }) => {
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
        <img src={logoIcon} alt="logo" onClick={logoClick} />
        <img src={crossIcon} alt="cross" onClick={handleClick} />
      </div>
      <div className="slideBar__items">
        <Link to='/next' className='slideBar__item' onClick={handleClick}>Ближайшие мероприятия</Link>
        <Link to='/past' className='slideBar__item' onClick={handleClick}>Прошедшие мероприятия</Link>
        <Link to='/contacts' className='slideBar__item' onClick={handleClick}>Контакты</Link>
        <Link to='/' className='slideBar__item' onClick={handleClick}>Карта корпусов</Link>
      </div>
    </div>
  )
}

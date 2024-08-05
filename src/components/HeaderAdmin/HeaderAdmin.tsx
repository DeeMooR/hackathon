import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearAdminName, useAppDispatch } from 'src/store';
import { logoIcon } from 'src/assets';
import './HeaderAdmin.css'

interface IHeaderAdmin {
  showModalEvent: () => void
}

export const HeaderAdmin:FC<IHeaderAdmin> = ({ showModalEvent }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickBack = () => {
    localStorage.removeItem('admin_name');
    dispatch(clearAdminName());
    navigate('/auth');
  }

  return (
    <header className='headerAdmin'>
      <div className="wrapper">
        <div className="headerAdmin__left">
          <img src={logoIcon} alt="logo" />
          <p>АДМИН-ПАНЕЛЬ</p>
        </div>
        <div className="headerAdmin__right">
          <button className='second-button headerAdmin__button headerAdmin__full' onClick={showModalEvent}>Добавить мероприятие</button>
          <button className='second-button headerAdmin__button headerAdmin__short' onClick={showModalEvent}>Добавить</button>
          <a className='headerAdmin__link headerAdmin__full' onClick={clickBack}>Выйти из аккаунта</a>
          <a className='headerAdmin__link headerAdmin__short' onClick={clickBack}>Выйти</a>
        </div>
      </div>
    </header>
  )
}

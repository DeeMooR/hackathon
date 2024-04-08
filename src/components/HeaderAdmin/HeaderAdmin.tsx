import React, { FC } from 'react'
import './HeaderAdmin.css'

import logo from "src/img/icons/Logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearAdminName } from 'src/store/mainSlice'

interface IHeaderAdmin {
  showModalEvent: () => void
}

const HeaderAdmin:FC<IHeaderAdmin> = ({ showModalEvent }) => {
  const dispatch = useDispatch();
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
          <img src={logo} alt="logo" />
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

export default HeaderAdmin

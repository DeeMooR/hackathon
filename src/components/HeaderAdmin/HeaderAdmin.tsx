import React, { FC } from 'react'
import './HeaderAdmin.css'

import logo from "src/img/icons/Logo.svg"
import { Link } from 'react-router-dom'

interface IHeaderAdmin {
  showModalEvent: () => void
}

const HeaderAdmin:FC<IHeaderAdmin> = ({ showModalEvent }) => {
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
          <Link to='/auth' className='headerAdmin__link headerAdmin__full'>Выйти из аккаунта</Link>
          <Link to='/auth' className='headerAdmin__link headerAdmin__short'>Выйти</Link>
        </div>
      </div>
    </header>
  )
}

export default HeaderAdmin

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { clearAdminName, setAdminModalAction, useAppDispatch } from 'src/store';
import { logoIcon } from 'src/assets';
import './HeaderAdmin.css'

export const HeaderAdmin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showModalCreate = () => {
    dispatch(setAdminModalAction('create'));
  }

  const clickBack = () => {
    dispatch(clearAdminName());
    localStorage.removeItem('adminName');
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
          <button className='second-button headerAdmin__button' onClick={showModalCreate}>
            {isMobile ? 'Добавить' : 'Добавить мероприятие'}
          </button>
          <a className='headerAdmin__link' onClick={clickBack}>
            {isMobile ? 'Выйти' : 'Выйти из аккаунта'}
          </a>
        </div>
      </div>
    </header>
  )
}

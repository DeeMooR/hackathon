import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkAuthAction, getAdmin, useAppDispatch, useAppSelector } from 'src/store'
import { Header, Footer } from 'src/components';
import { ModalMessage } from 'src/modals';
import { IAuth } from 'src/interface'
import './AuthPage.css'

export const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { adminFaculty, errorMessage } = useAppSelector(getAdmin);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isOpenModal, setOpenModal] = useState(false);

  const changeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const clickSingIn = () => {
    const obj: IAuth = {
      login: login,
      password: password
    }
    dispatch(checkAuthAction(obj));
  }

  useEffect(() => {
    if (adminFaculty) {
      localStorage.setItem('admin_name', adminFaculty);
      setTimeout(() => {
        navigate('/admin');
      }, 300)
    }
    if (errorMessage) setOpenModal(true);
  }, [adminFaculty, errorMessage])

  const closeModal = () => {
    document.body.style.overflowY = 'auto';
    document.body.style.padding = '0';
    setOpenModal(false);
  }

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflowY = 'hidden';
      document.body.style.padding = '0 17px 0 0';
    }
  }, [isOpenModal])

  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="authPage">
          <h1>Вход в админ-панель</h1>
          <div className="authPage__fields">
            <input type="text" className='authPage__login' placeholder='Логин' onChange={e => changeLogin(e)} />
            <input type="password" className='authPage__password' placeholder='Пароль' onChange={e => changePassword(e)} />
            <button className='button authPage__button' onClick={clickSingIn}>Войти</button>
          </div>
        </section>
      </div>
      <Footer/>
      <ModalMessage isOpen={isOpenModal} closeModal={closeModal} isSuccess={false}/>
    </>
  )
}

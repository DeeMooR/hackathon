import React, { useState } from 'react'
import './AuthPage.css'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { checkAuthAPI } from 'src/store/requests'
import { IAuth } from 'src/interface'

const AuthPage = () => {
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

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
    dispatch(checkAuthAPI(obj));
  }

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
    </>
  )
}

export default AuthPage

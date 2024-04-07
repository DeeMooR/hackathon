import React from 'react'
import './AuthPage.css'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

const AuthPage = () => {
  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="authPage">
          <h1>Вход в админ-панель</h1>
          <div className="authPage__fields">
            <input type="text" className='authPage__login' placeholder='Логин' />
            <input type="password" className='authPage__password' placeholder='Пароль' />
            <button className='button authPage__button'>Войти</button>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  )
}

export default AuthPage

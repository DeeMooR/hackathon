import React, { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { signInAction, clearAdminMessages, getAdminSelector, useAppDispatch, useAppSelector } from 'src/store'
import { Header, Footer, Notification, Input } from 'src/components';
import { authScheme } from 'src/validation';
import { ISignInForm } from 'src/interface'
import './AuthPage.css'

export const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { adminName, errorMessage } = useAppSelector(getAdminSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>({
    mode: 'onChange',
    resolver: yupResolver(authScheme)
  });

  useEffect(() => {
    if (adminName) navigate('/admin');
  }, [adminName])

  const onSubmit = (data: ISignInForm) => {
    dispatch(signInAction(data));
  }

  const clearMessages = () => {
    dispatch(clearAdminMessages());
  }

  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="authPage">
          <h1>Вход в админ-панель</h1>
          <form className="authPage__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="authPage__fields">
              <Input
                id='login'
                register={register}
                type="text"
                placeholder='Логин'
                error={errors.login?.message}
              />
              <Input
                id='password'
                register={register}
                type="password"
                placeholder='Пароль'
                error={errors.password?.message}
              />
            </div>
            <button type='submit' className='button authPage__button'>Войти</button>
          </form>
        </section>
      </div>
      <Footer/>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </>
  )
}

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { clearEmailMessages, getEmailSelector, setReceiverEmailAction, useAppDispatch, useAppSelector } from 'src/store';
import { Input, Notification } from 'src/components';
import { emailImage } from 'src/assets';
import './Newsletter.css'
import { IEmailForm } from 'src/interface';
import { emailScheme } from 'src/validation';

export const Newsletter = () => {
  const dispatch = useAppDispatch();
  const { successMessage, errorMessage } = useAppSelector(getEmailSelector);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<IEmailForm>({
    mode: 'onSubmit',
    resolver: yupResolver(emailScheme)
  });

  const onSubmit = (data: IEmailForm) => {
    if (data.email) {
      dispatch(setReceiverEmailAction(data));
      reset();
    }
    else setError('email', { type: 'custom', message: 'Некорректная почта' })
  }

  const clearMessages = () => {
    dispatch(clearEmailMessages());
  }

  return (
    <div className='newsletter'>
      <div className="wrapper">
        <div className="newsletter__photo-info">
          <img src={emailImage} className='newsletter__photo' alt="photo" />
          <div className="newsletter__text-fields">
            <div className="newsletter__text">
              <h2>Узнавайте первым о новых событиях</h2>
              <p>Введите почту и получайте уведомления о мероприятиях в БГУИР</p>
            </div>
            <form className="newsletter__fields" onClick={handleSubmit(onSubmit)}>
              <Input
                id='email'
                register={register}
                type="email"
                placeholder='Эл. почта'
                className='newsletter__input'
                error={errors.email?.message}
                isDark
              />
              <button className='second-button newsletter__button'>Получать уведомления на почту</button>
            </form>
          </div>
        </div>
      </div>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
      {successMessage && <Notification type='success' message={successMessage} clearMessage={clearMessages} />}
    </div>
  )
}

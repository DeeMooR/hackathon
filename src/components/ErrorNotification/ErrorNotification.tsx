import React, { FC, useEffect, useState } from 'react'
import './ErrorNotification.css'
import { crossIcon } from 'src/assets'

interface IErrorNotification {
  message?: string,
  displayTime?: number,
  clearMessage?: () => void,
}

export const ErrorNotification:FC<IErrorNotification> = ({
  message = 'Ошибка при выполнении действия',
  displayTime = 3000,
  clearMessage,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsVisible(false);
    if (clearMessage) clearMessage();
  }

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => closeModal, displayTime);
    return () => clearTimeout(timer);
  }, []);

  return !isVisible ? null : (
    <div className='errorNotification'>
      <div className="errorNotification__wrapper">
        <div className="errorNotification__icon">!</div>
        <p className='errorNotification__text'>{message}</p>
        <button type="button" className='errorNotification__cross' onClick={closeModal}>
          <img src={crossIcon} alt="close" />
        </button>
      </div>
    </div>
  )
}

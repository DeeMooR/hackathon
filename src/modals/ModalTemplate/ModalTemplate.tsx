import React, { FC, ReactNode, useEffect } from 'react'
import { crossIcon } from 'src/assets';
import './ModalTemplate.css'

interface IModalTemplate {
  closeModal: () => void;
  children: ReactNode;
  positionUp?: boolean
}

export const ModalTemplate:FC<IModalTemplate> = ({ closeModal, children, positionUp }) => {

  const clickClose = () => {
    document.body.style.overflowY = 'auto';
    document.body.style.padding = '0';
    closeModal();
  }

  const clickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) clickClose();
  };

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    document.body.style.padding = '0 17px 0 0';
  }, [])

  return (
    <div className='modal__background' onClick={(e) => clickBackground(e)}>
      <div className={`modal ${positionUp ? 'positionUp' : ''}`}>
        <div className="modal__content">
          <img src={crossIcon} className='modal__cross' onClick={clickClose} alt="cross" />
          {children}
        </div>
      </div>
    </div>
  )
}

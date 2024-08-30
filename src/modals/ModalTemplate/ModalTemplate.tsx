import React, { FC, ReactNode, useEffect } from 'react'
import { crossIcon } from 'src/assets';
import './ModalTemplate.css'

interface IModalTemplate {
  closeModal: () => void;
  children: ReactNode;
  positionUp?: boolean
}

export const ModalTemplate:FC<IModalTemplate> = ({ closeModal, children, positionUp }) => {

  const clickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeModal();
  };

  return (
    <div className='modal__background' onClick={(e) => clickBackground(e)}>
      <div className={`modal ${positionUp ? 'positionUp' : ''}`}>
        <div className="modal__content">
          <img src={crossIcon} className='modal__cross' onClick={closeModal} alt="cross" />
          {children}
        </div>
      </div>
    </div>
  )
}

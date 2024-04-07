import React, { FC, ReactNode } from 'react'
import './ModalTemplate.css'

import cross from "src/img/icons/Close.svg"

interface IModalTemplate {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  positionUp?: boolean
}

const ModalTemplate:FC<IModalTemplate> = ({ isOpen, closeModal, children, positionUp }) => {
  const clickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeModal();
  };

  return (
    <div className={`modal__background ${isOpen ? 'open' : ''}`} onClick={(e) => clickBackground(e)}>
      <div className={`modal ${positionUp ? 'positionUp' : ''}`}>
        <div className="modal__content">
          <img src={cross} className='modal__cross' onClick={closeModal} alt="cross" />
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalTemplate

import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { ModalTemplate } from 'src/modals';
import { modal_text } from 'src/helpers';
import './ModalMessage.css'

interface IModalMessage {
  isOpen: boolean,
  closeModal: () => void,
  isSuccess: boolean
}

export const ModalMessage:FC<IModalMessage> = ({ isOpen, closeModal, isSuccess }) => {
  const navigate = useNavigate();
  const obj = isSuccess ? modal_text[0] : modal_text[1];

  const backMainPage = () => {
    navigate('/')
  }

  return (
    <ModalTemplate closeModal={closeModal}>
      <div className="modalMessage">
        <h2>{obj.title}</h2>
        <p>{obj.text}</p>
        <button className='button' onClick={isSuccess ? backMainPage : closeModal}>{obj.button}</button>
      </div>
    </ModalTemplate>
  )
}

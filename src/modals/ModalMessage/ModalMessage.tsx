import React, { FC } from 'react'
import './ModalMessage.css'
import ModalTemplate from '../ModalTemplate'
import { event_members, modal_text } from 'src/helpers';
import { useNavigate } from 'react-router-dom';

interface IModalMessage {
  isOpen: boolean,
  closeModal: () => void,
  isSuccess: boolean
}

const ModalMessage:FC<IModalMessage> = ({ isOpen, closeModal, isSuccess }) => {
  const navigate = useNavigate();
  const obj = isSuccess ? modal_text[0] : modal_text[1];

  const backMainPage = () => {
    navigate('/')
  }

  return (
    <ModalTemplate isOpen={isOpen} closeModal={closeModal}>
      <div className="modalMessage">
        <h2>{obj.title}</h2>
        <p>{obj.text}</p>
        <button className='button' onClick={isSuccess ? backMainPage : closeModal}>{obj.button}</button>
      </div>
    </ModalTemplate>
  )
}

export default ModalMessage

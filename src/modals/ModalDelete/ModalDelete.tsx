import React, { FC } from 'react'
import './ModalDelete.css'
import ModalTemplate from '../ModalTemplate'

interface IModalDelete {
  isOpen: boolean,
  closeModal: () => void,
  deleteEvent: () => void
}

const ModalDelete:FC<IModalDelete> = ({ isOpen, closeModal, deleteEvent }) => {
  return (
    <ModalTemplate isOpen={isOpen} closeModal={closeModal}>
      <div className="modalDelete">
        <h2>Удалить мероприятие?</h2>
        <div className="modalDelete__buttons">
          <button className='second-button button-delete' onClick={deleteEvent}>Да, удалить</button>
          <button className='second-button button-cancel' onClick={closeModal}>Нет, оставить</button>
        </div>
      </div>
    </ModalTemplate>
  )
}

export default ModalDelete

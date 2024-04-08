import React, { FC } from 'react'
import './ModalMembers.css'
import ModalTemplate from '../ModalTemplate'
import { event_members } from 'src/helpers';

interface IModalMembers {
  isOpen: boolean,
  closeModal: () => void
}

const ModalMembers:FC<IModalMembers> = ({ isOpen, closeModal }) => {
  return (
    <ModalTemplate isOpen={isOpen} closeModal={closeModal}>
      <div className="modalMembers">
        <h2>Список участников</h2>
        <h3>Хакатон FCADHACK</h3>
        <ol>
          {event_members.map((value, i) =>
            <li key={i}>{value}</li> 
          )}
        </ol>
        <button className='button' onClick={closeModal}>Назад</button>
      </div>
    </ModalTemplate>
  )
}

export default ModalMembers

import React, { FC } from 'react'
import { membersExample } from 'src/helpers';
import { ModalTemplate } from 'src/modals';
import './ModalMembers.css'

interface IModalMembers {
  isOpen: boolean,
  closeModal: () => void
}

export const ModalMembers:FC<IModalMembers> = ({ isOpen, closeModal }) => {
  const members = membersExample;

  return (
  <>
    {members &&
      <ModalTemplate isOpen={isOpen} closeModal={closeModal}>
      <div className="modalMembers">
        <h2>Список участников</h2>
        <h3>Хакатон FCADHACK</h3>
        {members.length === 0 &&
          <p>_ _Пусто_ _</p>
        }
        <ol>
          {members.map((value, i) =>
            <li key={i}>{value}</li> 
          )}
        </ol>
        <button className='button' onClick={closeModal}>Назад</button>
      </div>
    </ModalTemplate>
    }
  </>
  )
}

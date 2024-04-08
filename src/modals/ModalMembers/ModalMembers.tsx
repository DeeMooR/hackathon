import React, { FC } from 'react'
import './ModalMembers.css'
import ModalTemplate from '../ModalTemplate'
import { event_members } from 'src/helpers';
import { useSelector } from 'react-redux';

interface IModalMembers {
  isOpen: boolean,
  closeModal: () => void
}

const ModalMembers:FC<IModalMembers> = ({ isOpen, closeModal }) => {
  const {members}:{members: string[]} = useSelector((state: any) => state.main);

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

export default ModalMembers

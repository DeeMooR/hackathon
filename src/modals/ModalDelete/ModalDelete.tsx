import React from 'react'
import { ModalTemplate } from 'src/modals';
import { clearModal, deleteEventAction, getAdminSelector, getModalSelector, setModalErrorMessage, useAppDispatch, useAppSelector } from 'src/store';
import { allFaculties } from 'src/helpers';
import { Loading, Wait } from 'src/components';
import './ModalDelete.css'

export const ModalDelete = () => {
  const dispatch = useAppDispatch();
  const { eventId, event, isLoading } = useAppSelector(getModalSelector);
  const { adminName } = useAppSelector(getAdminSelector); 
  const faculty = allFaculties.includes(adminName) ? adminName : null;
  const wait = Wait(isLoading);

  const deleteEvent = () => {
    if (event && event.id === eventId) {
      const page = event.page;
      dispatch(deleteEventAction({page, faculty}));
    }
    else dispatch(setModalErrorMessage('Ошибка при удалении мероприятия'));
  }

  const closeModal = () => {
    dispatch(clearModal());
  }

  return (
    <ModalTemplate closeModal={closeModal}>
      <div className="modalDelete">
        <h2>Удалить мероприятие?</h2>
        {wait ? <Loading /> : 
          <div className="modalDelete__buttons">
            <button className='second-button button-delete' onClick={deleteEvent}>Да, удалить</button>
            <button className='second-button button-cancel' onClick={closeModal}>Нет, оставить</button>
          </div>
        }
      </div>
    </ModalTemplate>
  )
}

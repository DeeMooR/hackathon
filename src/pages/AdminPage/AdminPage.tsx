import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearAdminMessages, getAdminSelector, useAppDispatch, useAppSelector, getEventsFacultyAction, checkAuthAction, setAdminIsExit, setAdminErrorMessage, getAdminModalActionSelector } from 'src/store'
import { HeaderAdmin, Footer, Notification, EventsAdmin } from 'src/components';
import { allFaculties } from 'src/helpers'
import './AdminPage.css'
import { ModalMembers } from 'src/modals';

export const AdminPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { adminName, eventsNext, eventsPast, errorMessage, isExit } = useAppSelector(getAdminSelector);
  const modalAction = useAppSelector(getAdminModalActionSelector);
  const accessKey = localStorage.getItem('accessKey');

  useEffect(() => {
    if (isExit) {
      navigate('/auth');
      dispatch(setAdminIsExit(false));
    }
  }, [isExit]);

  useEffect(() => {
    if (accessKey) {
      if (adminName) {
        const faculty = allFaculties.includes(adminName) ? adminName : null;
        dispatch(getEventsFacultyAction(faculty));
      } else {
        dispatch(checkAuthAction(accessKey));
      }
    } else {
      dispatch(setAdminErrorMessage('Произошла ошибка. Выход из аккаунта'));
      navigate('/auth');
    }
  }, [accessKey, adminName]);

  const getPartTitle = () => {
    return (adminName && allFaculties.includes(adminName)) ? 'Студ. совет ' : '';
  }

  const clearMessages = () => {
    dispatch(clearAdminMessages())
  }

  return (
    <>
      <HeaderAdmin />
      <div className="wrapper">
        <section className="adminPage">
          <h1>{getPartTitle()}<span>{adminName}</span></h1>
          <div className="adminPage__events">
            <EventsAdmin eventsShow={eventsNext} type='next' />
          </div>
          <div className="adminPage__events">
            <EventsAdmin eventsShow={eventsPast} type='past' />
          </div>
        </section>
      </div>
      <Footer/>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
      {modalAction === 'members' && <ModalMembers />}
      {/* 
      <ModalEvent isOpen={isOpenModalEvent} closeModal={closeModal} action='add' />
      <ModalEvent event={eventExample} isOpen={isOpenModalChangeEvent} closeModal={closeModal} action='change' clickShowDelete={clickShowDelete} />
      <ModalMembers isOpen={isOpenModalMembers} closeModal={closeModal} />
      <ModalDelete isOpen={isOpenModalDelete} closeModal={closeModal} deleteEvent={deleteEvent} />
      <ModalMessage isOpen={true} closeModal={closeModal} isSuccess={false}/> 
      */}
    </>
  )
}

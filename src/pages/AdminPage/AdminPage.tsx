import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearAdminMessages, getAdminSelector, useAppDispatch, useAppSelector, getEventsTopAction, setAdminName, clearAdminName, getEventsFacultyAction } from 'src/store'
import { HeaderAdmin, Footer, Notification, EventsAdmin } from 'src/components';
import { allFaculties } from 'src/helpers'
import './AdminPage.css'

export const AdminPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { adminName, eventsNext, eventsPast, errorMessage } = useAppSelector(getAdminSelector);
  
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminName');
    if (isAdmin) {
      dispatch(setAdminName(isAdmin));
    } else {
      localStorage.removeItem('adminName');
      navigate('/auth');
    }
  }, []);

  useEffect(() => {
    if (adminName) {
      const faculty = allFaculties.includes(adminName) ? adminName : null;
      dispatch(getEventsFacultyAction(faculty));
    }
  }, [adminName])

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

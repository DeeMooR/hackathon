import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearAdminMessages, getAdminSelector, getEventsSelector, getEventsNextAction, getEventsPastAction, useAppDispatch, useAppSelector, getEventsTopAction } from 'src/store'
import { HeaderAdmin, Footer, MiniCard, Notification, EventsAdmin } from 'src/components';
import { ModalEvent, ModalMembers, ModalMessage, ModalDelete } from 'src/modals';
import { allFaculties, eventExample } from 'src/helpers'
import { IShortEvent } from 'src/interface'
import { deleteEventAPI, getEventMembersAPI } from 'src/store/requests'
import './AdminPage.css'

export const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { adminName, eventsNext, eventsPast, errorMessage } = useAppSelector(getAdminSelector);

  const { events } = useAppSelector(getEventsSelector);
  const [isOpenModalEvent, setOpenModalEvent] = useState(false);
  const [isOpenModalChangeEvent, setOpenModalChangeEvent] = useState(false);
  const [isOpenModalMembers, setOpenModalMembers] = useState(false);
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);

  const [idEventAction, setIdEventAction] = useState(-1);
  const [objEventAction, setObjEventAction] = useState<IShortEvent>();

  useEffect(() => {
    dispatch(getEventsTopAction());
  }, [])

  const showModalEvent = () => {
    console.log('ku')
    setOpenModalEvent(true);
  }
  const clickChangeEvent = (id: number) => {setIdEventAction(id);
    const obj = [...events].find((item: IShortEvent) => item.id === id);
    setObjEventAction(obj);
    setOpenModalChangeEvent(true);
  }
  const clickShowMembers = (id: number) => {
    setIdEventAction(id);
    setOpenModalMembers(true);
    dispatch(getEventMembersAPI(id));
  }
  const clickShowDelete = (id: number) => {
    setIdEventAction(id);
    setOpenModalChangeEvent(false);
    setOpenModalDelete(true);
  }
  const deleteEvent = () => {
    if (idEventAction) {
      dispatch(deleteEventAPI(idEventAction));
      window.scrollTo(0, 0);
      closeModal();
    }
  }

  const closeModal = () => {
    document.body.style.overflowY = 'auto';
    document.body.style.padding = '0';
    setOpenModalEvent(false);
    setOpenModalChangeEvent(false);
    setOpenModalMembers(false);
    setOpenModalDelete(false);
  }

  useEffect(() => {
    if (isOpenModalEvent || isOpenModalChangeEvent || isOpenModalMembers || isOpenModalDelete) {
      document.body.style.overflowY = 'hidden';
      document.body.style.padding = '0 17px 0 0';
    }
  }, [isOpenModalEvent, isOpenModalChangeEvent, isOpenModalMembers, isOpenModalDelete])

  let organization = '';
  let faculty = '';
  if (adminName && allFaculties.includes(adminName)) {
    organization = 'Студ. совет ';
    faculty = adminName;
  } 
  else organization = adminName || '';

  const clearMessages = () => {
    dispatch(clearAdminMessages())
  }

  return (
    <>
      <HeaderAdmin showModalEvent={showModalEvent}/>
      <div className="wrapper">
        <section className="adminPage">
          <h1>{organization}<span>{faculty}</span></h1>
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
      <ModalEvent isOpen={isOpenModalEvent} closeModal={closeModal} action='add' />
      <ModalEvent event={eventExample} isOpen={isOpenModalChangeEvent} closeModal={closeModal} action='change' clickShowDelete={clickShowDelete} />
      <ModalMembers isOpen={isOpenModalMembers} closeModal={closeModal} />
      <ModalDelete isOpen={isOpenModalDelete} closeModal={closeModal} deleteEvent={deleteEvent} />
      <ModalMessage isOpen={true} closeModal={closeModal} isSuccess={false}/>
    </>
  )
}

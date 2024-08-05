import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAdmin, getEvents, getEventsNextAction, getEventsPastAction, useAppDispatch, useAppSelector } from 'src/store'
import { HeaderAdmin, Footer, MiniCard } from 'src/components';
import { ModalEvent, ModalMembers, ModalMessage, ModalDelete } from 'src/modals';
import { allFaculties, eventExample } from 'src/helpers'
import { IShortEvent } from 'src/interface'
import { deleteEventAPI, getEventMembersAPI } from 'src/store/requests'
import './AdminPage.css'

export const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector(getEvents);
  const { adminName } = useAppSelector(getAdmin);
  const [isOpenModalEvent, setOpenModalEvent] = useState(false);
  const [isOpenModalChangeEvent, setOpenModalChangeEvent] = useState(false);
  const [isOpenModalMembers, setOpenModalMembers] = useState(false);
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);

  let visit = 'С регистрацией';

  const [eventsNextFaculty, setEventsNextFaculty] = useState<IShortEvent[] | []>([]);
  const [eventsPastFaculty, setEventsPastFaculty] = useState<IShortEvent[] | []>([]);

  const [idEventAction, setIdEventAction] = useState(-1);
  const [objEventAction, setObjEventAction] = useState<IShortEvent>();

  useEffect(() => {
    dispatch(getEventsPastAction());
  }, [])

  useEffect(() => {
    const updateNext = allFaculties.includes(adminName) 
      ? events.filter((item: IShortEvent) => item.faculties.includes(adminName))
      : [...events];
    setEventsNextFaculty(updateNext);
    console.log(eventsNextFaculty)
  },[events])

  useEffect(() => {
    const updatePast = allFaculties.includes(adminName) 
      ? events.filter((item: IShortEvent) => item.faculties.includes(adminName))
      : [...events];
      setEventsPastFaculty(updatePast);
      console.log(eventsPastFaculty)
  },[events])

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
  if (allFaculties.includes(adminName)) {
    organization = 'Студ. совет ';
    faculty = adminName;
  } 
  else organization = adminName;

  return (
    <>
      <HeaderAdmin showModalEvent={showModalEvent}/>
      <div className="wrapper">
        <section className="adminPage">
          <h1>{organization}<span>{faculty}</span></h1>
          <h2>Ближайшие мероприятия</h2>
          <div className="adminPage__events">
            {eventsNextFaculty.length === 0 ?
              <h3>Пусто</h3>
            :
            <>
            {eventsNextFaculty.map((obj: IShortEvent, i: number) => (
              visit !== 'С регистрацией' 
                ? <MiniCard obj={obj} key={i} edit clickChangeEvent={clickChangeEvent} />
                : <MiniCard obj={obj} key={i} edit show_users clickShowMembers={clickShowMembers} clickChangeEvent={clickChangeEvent} />
            ))}
            </>
            }
          </div>
          <h2>Прошедшие мероприятия</h2>
          <div className="adminPage__events">
            {eventsPastFaculty.length === 0 ?
              <h3>Пусто</h3>
            :
            <>
            {eventsPastFaculty.map((obj: IShortEvent, i: number) => (
              visit !== 'С регистрацией' 
                ? <MiniCard obj={obj} key={i} edit clickChangeEvent={clickChangeEvent} />
                : <MiniCard obj={obj} key={i} edit show_users clickShowMembers={clickShowMembers} clickChangeEvent={clickChangeEvent} />
            ))}
            </>
            }
          </div>
        </section>
      </div>
      <Footer/>
      <ModalEvent isOpen={isOpenModalEvent} closeModal={closeModal} action='add' />
      <ModalEvent event={eventExample} isOpen={isOpenModalChangeEvent} closeModal={closeModal} action='change' clickShowDelete={clickShowDelete} />
      <ModalMembers isOpen={isOpenModalMembers} closeModal={closeModal} />
      <ModalDelete isOpen={isOpenModalDelete} closeModal={closeModal} deleteEvent={deleteEvent} />
      {/* <ModalMessage isOpen={true} closeModal={closeModal} isSuccess={false}/> */}
    </>
  )
}

import React, { useEffect, useState } from 'react'
import './AdminPage.css'
import HeaderAdmin from 'src/components/HeaderAdmin'
import Footer from 'src/components/Footer'
import MiniCard from 'src/components/MiniCard'
import { faculties } from 'src/helpers'
import ModalEvent from 'src/modals/ModalEvent'
import ModalMembers from 'src/modals/ModalMembers'
import ModalMessage from 'src/modals/ModalMessage'
import ModalDelete from 'src/modals/ModalDelete'
import { useDispatch, useSelector } from 'react-redux'
import { IEvent } from 'src/interface'
import { useNavigate } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { deleteEventAPI, getEventMembersAPI } from 'src/store/requests'

const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const {eventsNext, eventsPast, admin_name} = useSelector((state: any) => state.main);
  const [isOpenModalEvent, setOpenModalEvent] = useState(false);
  const [isOpenModalChangeEvent, setOpenModalChangeEvent] = useState(false);
  const [isOpenModalMembers, setOpenModalMembers] = useState(false);
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);

  const [eventsNextFaculty, setEventsNextFaculty] = useState([]);
  const [eventsPastFaculty, setEventsPastFaculty] = useState([]);

  const [idEventAction, setIdEventAction] = useState(-1);
  const [objEventAction, setObjEventAction] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    const updateNext = faculties.includes(admin_name) 
      ? eventsNext.filter((item: IEvent) => item.faculties.includes(admin_name))
      : [...eventsNext];
    setEventsNextFaculty(updateNext);
    console.log(eventsNextFaculty)
  },[eventsNext])

  useEffect(() => {
    const updatePast = faculties.includes(admin_name) 
      ? eventsPast.filter((item: IEvent) => item.faculties.includes(admin_name))
      : [...eventsPast];
      setEventsPastFaculty(updatePast);
      console.log(eventsPastFaculty)
  },[eventsPast])

  const showModalEvent = () => {
    console.log('ku')
    setOpenModalEvent(true);
  }
  const clickChangeEvent = (id: number) => {setIdEventAction(id);
    const obj = [...eventsNext, ...eventsPast].find((item: IEvent) => item.id === id);
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
  if (faculties.includes(admin_name)) {
    organization = 'Студ. совет ';
    faculty = admin_name;
  } 
  else organization = admin_name;

  return (
    <>
    {eventsNextFaculty.length > 0 && eventsPastFaculty.length > 0 &&
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
              {eventsNextFaculty.map((obj: IEvent, i: number) => (
                obj.visit !== 'С регистрацией' 
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
              {eventsPastFaculty.map((obj: IEvent, i: number) => (
                obj.visit !== 'С регистрацией' 
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
        <ModalEvent event={objEventAction} isOpen={isOpenModalChangeEvent} closeModal={closeModal} action='change' clickShowDelete={clickShowDelete} />
        <ModalMembers isOpen={isOpenModalMembers} closeModal={closeModal} />
        <ModalDelete isOpen={isOpenModalDelete} closeModal={closeModal} deleteEvent={deleteEvent} />
        {/* <ModalMessage isOpen={true} closeModal={closeModal} isSuccess={false}/> */}
      </>
    }
    </>
  )
}

export default AdminPage

import React, { useEffect, useState } from 'react'
import './AdminPage.css'
import HeaderAdmin from 'src/components/HeaderAdmin'
import Footer from 'src/components/Footer'
import MiniCard from 'src/components/MiniCard'
import { faculties, faculty__user } from 'src/helpers'
import ModalEvent from 'src/modals/ModalEvent'
import ModalMembers from 'src/modals/ModalMembers'
import ModalMessage from 'src/modals/ModalMessage'
import ModalDelete from 'src/modals/ModalDelete'
import { useSelector } from 'react-redux'
import { IEvent } from 'src/interface'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
  const navigate = useNavigate();
  const {eventsNext, eventsPast, admin_name} = useSelector((state: any) => state.main);
  const [isOpenModalEvent, setOpenModalEvent] = useState(false);
  const [isOpenModalChangeEvent, setOpenModalChangeEvent] = useState(false);
  const [isOpenModalMembers, setOpenModalMembers] = useState(false);
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);

  const [eventsNextFaculty, setEventsNextFaculty] = useState([]);
  const [eventsPastFaculty, setEventsPastFaculty] = useState([]);

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
    setOpenModalEvent(true);
  }
  const clickChangeEvent = (id: number) => {
    setOpenModalChangeEvent(true);
  }
  const clickShowMembers = (id: number) => {
    setOpenModalMembers(true);
  }
  const clickShowDelete = () => {
    setOpenModalEvent(false);
    setOpenModalDelete(true);
  }
  const deleteEvent = () => {}

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
  if (faculties.includes(faculty__user)) {
    organization = 'Студ. совет ';
    faculty = faculty__user;
  } 
  else organization = faculty__user;

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
        <ModalEvent isOpen={isOpenModalChangeEvent} closeModal={closeModal} action='change' clickShowDelete={clickShowDelete} />
        <ModalMembers isOpen={isOpenModalMembers} closeModal={closeModal} />
        <ModalDelete isOpen={isOpenModalDelete} closeModal={closeModal} deleteEvent={deleteEvent} />
        {/* <ModalMessage isOpen={true} closeModal={closeModal} isSuccess={false}/> */}
      </>
    }
    </>
  )
}

export default AdminPage

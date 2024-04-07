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

const AdminPage = () => {
  const [isOpenModalEvent, setOpenModalEvent] = useState(false);
  const [isOpenModalChangeEvent, setOpenModalChangeEvent] = useState(false);
  const [isOpenModalMembers, setOpenModalMembers] = useState(false);
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);

  const showModalEvent = () => {
    setOpenModalEvent(true);
  }
  const clickChangeEvent = () => {
    setOpenModalChangeEvent(true);
  }
  const clickShowMembers = () => {
    setOpenModalMembers(true);
  }
  const clickShowDelete = () => {
    setOpenModalEvent(false);
    setOpenModalDelete(true);
  }

  const closeModal = () => {
    document.body.style.overflowY = 'auto';
    document.body.style.padding = '0';
    setOpenModalEvent(false);
    setOpenModalChangeEvent(false);
    setOpenModalMembers(false);
    setOpenModalDelete(false);
  }

  const addEvent = () => {}
  const changeEvent = () => {}
  const deleteEvent = () => {}

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
      <HeaderAdmin showModalEvent={showModalEvent}/>
      <div className="wrapper">
        <section className="adminPage">
          <h1>{organization}<span>{faculty}</span></h1>
          <h2>Ближайшие мероприятия</h2>
          <div className="adminPage__events">
            <MiniCard edit show_users clickShowMembers={clickShowMembers} clickChangeEvent={clickChangeEvent}/>
            <MiniCard edit show_users clickShowMembers={clickShowMembers} clickChangeEvent={clickChangeEvent}/>
            <MiniCard edit clickShowMembers={clickShowMembers} clickChangeEvent={clickChangeEvent}/>
            <MiniCard edit show_users clickShowMembers={clickShowMembers} clickChangeEvent={clickChangeEvent}/>
            <MiniCard edit clickShowMembers={clickShowMembers} clickChangeEvent={clickChangeEvent}/>
          </div>
          <h2>Прошедшие мероприятия</h2>
          <div className="adminPage__events">
            <MiniCard edit clickShowMembers={clickShowMembers} clickChangeEvent={clickChangeEvent}/>
            <MiniCard edit show_users clickShowMembers={clickShowMembers} clickChangeEvent={clickChangeEvent}/>
            <MiniCard edit show_users clickShowMembers={clickShowMembers} clickChangeEvent={clickChangeEvent}/>
            <MiniCard edit show_users clickShowMembers={clickShowMembers} clickChangeEvent={clickChangeEvent}/>
          </div>
        </section>
      </div>
      <Footer/>
      <ModalEvent isOpen={isOpenModalEvent} closeModal={closeModal} action='add' addEvent={addEvent} />
      <ModalEvent isOpen={isOpenModalChangeEvent} closeModal={closeModal} action='change' changeEvent={changeEvent} clickShowDelete={clickShowDelete} />
      <ModalMembers isOpen={isOpenModalMembers} closeModal={closeModal} />
      <ModalDelete isOpen={isOpenModalDelete} closeModal={closeModal} deleteEvent={deleteEvent} />
      {/* <ModalMessage isOpen={true} closeModal={closeModal} isSuccess={false}/> */}
    </>
  )
}

export default AdminPage

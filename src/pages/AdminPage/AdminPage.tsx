import React, { useEffect, useState } from 'react'
import './AdminPage.css'
import HeaderAdmin from 'src/components/HeaderAdmin'
import Footer from 'src/components/Footer'
import MiniCard from 'src/components/MiniCard'
import { faculties, faculty__user } from 'src/helpers'
import ModalEvent from 'src/modals/ModalEvent'
import ModalMembers from 'src/modals/ModalMembers'
import ModalMessage from 'src/modals/ModalMessage'

const AdminPage = () => {
  const [isOpenModalEvent, setOpenModalEvent] = useState(false);
  const [isOpenModalMembers, setOpenModalMembers] = useState(false);

  const showModalEvent = () => {
    setOpenModalEvent(true);
  }
  const clickShowMembers = () => {
    setOpenModalMembers(true);
  }

  const closeModal = () => {
    document.body.style.overflowY = 'auto';
    document.body.style.padding = '0';
    setOpenModalEvent(false);
    setOpenModalMembers(false);
  }

  useEffect(() => {
    if (isOpenModalEvent || isOpenModalMembers) {
      document.body.style.overflowY = 'hidden';
      document.body.style.padding = '0 17px 0 0';
    }
  }, [isOpenModalEvent, isOpenModalMembers])
 

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
            <MiniCard edit show_users clickShowMembers={clickShowMembers}/>
            <MiniCard edit show_users clickShowMembers={clickShowMembers}/>
            <MiniCard edit clickShowMembers={clickShowMembers}/>
            <MiniCard edit show_users clickShowMembers={clickShowMembers}/>
            <MiniCard edit clickShowMembers={clickShowMembers}/>
          </div>
          <h2>Прошедшие мероприятия</h2>
          <div className="adminPage__events">
            <MiniCard edit clickShowMembers={clickShowMembers}/>
            <MiniCard edit show_users clickShowMembers={clickShowMembers}/>
            <MiniCard edit show_users clickShowMembers={clickShowMembers}/>
            <MiniCard edit show_users clickShowMembers={clickShowMembers}/>
          </div>
        </section>
      </div>
      <Footer/>
      <ModalEvent isOpen={isOpenModalEvent} closeModal={closeModal} />
      <ModalMembers isOpen={isOpenModalMembers} closeModal={closeModal} />
      {/* <ModalMessage isOpen={true} closeModal={closeModal} isSuccess={false}/> */}
    </>
  )
}

export default AdminPage

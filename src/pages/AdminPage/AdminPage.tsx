import React, { useEffect, useState } from 'react'
import './AdminPage.css'
import HeaderAdmin from 'src/components/HeaderAdmin'
import Footer from 'src/components/Footer'
import MiniCard from 'src/components/MiniCard'
import { faculties } from 'src/helpers'
import ModalMembers from 'src/components/ModalMembers'

const AdminPage = () => {
  const [isOpenModalMembers, setOpenModalMembers] = useState(false);

  const showModalMembers = () => {
    setOpenModalMembers(true);
  }
  
  const closeModal = () => {
    document.body.style.overflowY = 'auto';
    document.body.style.padding = '0';
    setOpenModalMembers(false);
  }

  useEffect(() => {
    if (isOpenModalMembers) {
      document.body.style.overflowY = 'hidden';
      document.body.style.padding = '0 17px 0 0';
    }
  }, [isOpenModalMembers])

  const str = 'ФКП';
  let organization = '';
  let faculty = '';
  if (faculties.includes(str)) {
    organization = 'Студ. совет ';
    faculty = str;
  } 
  else organization = str;

  return (
    <>
      <HeaderAdmin showModalMembers={showModalMembers}/>
      <div className="wrapper">
        <section className="adminPage">
          <h1>{organization}<span>{faculty}</span></h1>
          <h2>Ближайшие мероприятия</h2>
          <div className="adminPage__events">
            <MiniCard edit show_users/>
            <MiniCard edit show_users/>
            <MiniCard edit/>
            <MiniCard edit show_users/>
            <MiniCard edit/>
          </div>
          <h2>Прошедшие мероприятия</h2>
          <div className="adminPage__events">
            <MiniCard edit/>
            <MiniCard edit show_users/>
            <MiniCard edit show_users/>
            <MiniCard edit show_users/>
          </div>
        </section>
      </div>
      <Footer/>
      <ModalMembers isOpen={isOpenModalMembers} closeModal={closeModal} />
    </>
  )
}

export default AdminPage

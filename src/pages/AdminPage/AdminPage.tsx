import React from 'react'
import './AdminPage.css'
import HeaderAdmin from 'src/components/HeaderAdmin'
import Footer from 'src/components/Footer'
import MiniCard from 'src/components/MiniCard'
import { faculties } from 'src/helpers'

const AdminPage = () => {
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
      <HeaderAdmin/>
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
    </>
  )
}

export default AdminPage

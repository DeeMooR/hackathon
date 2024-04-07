import React from 'react'
import './AdminPage.css'
import HeaderAdmin from 'src/components/HeaderAdmin'
import Footer from 'src/components/Footer'

const AdminPage = () => {
  const faculty = 'ФКП';
  return (
    <>
      <HeaderAdmin/>
      <div className="wrapper">
        <section className="adminPage">
          <h1>Студ. совет <span>{faculty}</span></h1>
        </section>
      </div>
      <Footer/>
    </>
  )
}

export default AdminPage

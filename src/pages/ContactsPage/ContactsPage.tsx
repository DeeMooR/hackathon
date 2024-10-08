import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Header, Footer, Newsletter, ContactCard } from 'src/components';
import { IContact } from 'src/interface'
import { contacts } from 'src/helpers'
import './ContactsPage.css'

export const ContactsPage = () => {
  const navigate = useNavigate();
  const openMainPage = () => {
    navigate('/');
  }

  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="contactsPage">
          <p className='crumbs' onClick={openMainPage}>Главная /</p>
          <h1>Контакты студ. советов</h1>
          <div className="contactsPage__cards">
            {contacts.map((obj: IContact) => 
              <ContactCard obj={obj} key={obj.name} />
            )}
          </div>
        </section>
      </div>
      <Newsletter/>
      <Footer/>
    </>
  )
}

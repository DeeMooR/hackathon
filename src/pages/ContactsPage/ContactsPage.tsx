import React from 'react'
import './ContactsPage.css'
import Header from 'src/components/Header'
import Newsletter from 'src/components/Newsletter'
import Footer from 'src/components/Footer'
import { IContact } from 'src/interface'
import ContactCard from 'src/components/ContactCard'
import { contacts } from 'src/helpers'

const ContactsPage = () => {
  return (
    <>
      <Header/>
      <div className="wrapper">
        <section className="contactsPage">
          <p className='crumbs'>Главная /</p>
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

export default ContactsPage

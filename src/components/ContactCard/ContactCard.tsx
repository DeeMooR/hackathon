import React, { FC } from 'react'
import './ContactCard.css'
import { IContact } from 'src/interface'

import instagram from "src/img/icons/instagram.svg"
import telegram from "src/img/icons/telegram.svg"

const ContactCard:FC<{obj: IContact}> = ({obj}) => {
  return (
    <div className='contactCard'>
      <h2>{obj.name}</h2>
      <div className='contactCard__icons'>
        <a href={obj.inst} target='blank'>
          <img src={instagram} alt="instagram" />
        </a>
        <a href={obj.telegram} target='blank'>
          <img src={telegram} alt="telegram" />
        </a>
      </div>
    </div>
  )
}

export default ContactCard

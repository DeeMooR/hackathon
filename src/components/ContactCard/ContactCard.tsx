import React, { FC } from 'react'
import { IContact } from 'src/interface'
import { instagramIcon, telegramIcon } from 'src/assets'
import './ContactCard.css'

export const ContactCard:FC<{obj: IContact}> = ({obj}) => {
  return (
    <div className='contactCard'>
      <h2>{obj.name}</h2>
      <div className='contactCard__icons'>
        <a href={obj.inst} target='blank'>
          <img src={instagramIcon} alt="instagram" />
        </a>
        <a href={obj.telegram} target='blank'>
          <img src={telegramIcon} alt="telegram" />
        </a>
      </div>
    </div>
  )
}

import React, { FC } from 'react'
import './IconText.css'

interface IIconText {
  icon: string,
  text: string,
  isBlueBox?: boolean
}

const IconText:FC<IIconText> = ({icon, text, isBlueBox = false}) => {
  return (
    <div className={`iconText ${isBlueBox ? 'blue-box' : ''}`}>
      <img src={icon} alt="icon" />
      <p>{text}</p>
    </div>
  )
}

export default IconText

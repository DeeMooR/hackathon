import React, { FC } from 'react'
import './TextInput.css'

interface ITextInput {
  text: string,
  type: string,
  placeholder?: string
}

const TextInput:FC<ITextInput> = ({text, type, placeholder = ''}) => {
  return (
    <div className='textInput'>
      <h3>{text}</h3>
      <input type={type} placeholder={placeholder} />
    </div>
  )
}

export default TextInput

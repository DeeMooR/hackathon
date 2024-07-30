import React, { FC } from 'react'
import './TextInput.css'

interface ITextInput {
  text: string,
  type: string,
  value: any,
  onChange: (value: any) => void
  placeholder?: string
}

export const TextInput:FC<ITextInput> = ({text, type, value, onChange, placeholder = ''}) => {

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    console.log(e.target.value)
  };

  return (
    <div className='textInput'>
      <h3>{text}</h3>
      <input 
        className={`${(type === 'date' || type === 'time') ? 'input_padding' : ''}`} 
        type={type} 
        value={value} 
        placeholder={placeholder} 
        onChange={e => changeInput(e)}
      />
    </div>
  )
}

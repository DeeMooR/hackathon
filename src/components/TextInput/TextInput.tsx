import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form';
import { Input } from 'src/components';
import './TextInput.css'

interface ITextInput {
  text: string;
  id: string;
  register: UseFormRegister<any>;
  type: string;
  placeholder?: string;
  error?: string;
}

export const TextInput:FC<ITextInput> = ({text, id, type, register, placeholder, error}) => {
  return (
    <div className='textInput'>
      <h3>{text}</h3>
      <Input
        id={id}
        register={register}
        type={type}
        placeholder={placeholder}
        error={error}
      />
    </div>
  )
}

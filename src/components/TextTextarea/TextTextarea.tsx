import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form';
import { Textarea } from 'src/components';
import './TextTextarea.css'

interface ITextTextarea {
  text: string;
  id: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  error?: string;
}

export const TextTextarea:FC<ITextTextarea> = ({text, id, register, placeholder, error}) => {
  return (
    <div className='textTextarea'>
      <h3>{text}</h3>
      <Textarea
        id={id}
        register={register}
        placeholder={placeholder}
        error={error}
      />
    </div>
  )
}

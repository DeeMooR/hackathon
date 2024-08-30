import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form';
import { warningIcon } from 'src/assets';
import './Textarea.css'

interface ITextarea {
  id: string;
  register: UseFormRegister<any>;
  className?: string;
  placeholder?: string;
  error?: string;
}

export const Textarea:FC<ITextarea> = ({id, placeholder, className, register, error}) => {
  const textareaStyle = `${error ? 'showWarning' : ''}`
  
  return (
    <div className={`textareaBlock ${className}`}>
      <textarea 
        id={id}
        {...register(id)}
        placeholder={placeholder}
        className={textareaStyle}
      />
      {error &&
        <p className='error'>
          <img src={warningIcon} alt="warning" />
          <span>{error}</span>
        </p>
      }
    </div>
  )
}

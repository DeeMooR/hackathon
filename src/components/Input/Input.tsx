import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form';
import { warningIcon } from 'src/assets';
import './Input.css'

interface IInput {
  id: string;
  register: UseFormRegister<any>;
  type: string;
  className?: string;
  placeholder?: string;
  error?: string;
}

export const Input:FC<IInput> = ({id, type, placeholder, className, register, error}) => {
  const inputStyle = `${error ? 'warning' : ''}`
  
  return (
    <div className={`inputBlock ${className}`}>
      <input 
        id={id}
        {...register(id)}
        type={type}
        placeholder={placeholder}
        className={inputStyle}
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

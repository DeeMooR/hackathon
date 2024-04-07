import React, { FC } from 'react'
import './RadioOptions.css'

interface IRadioOptions {
  options: string[],
  selected: string,
  name: string,
  onClickOption: (value: string) => void
}

const RadioOptions:FC<IRadioOptions> = ({options, selected, name, onClickOption}) => {
  return (
    <>
      {options.map(value => 
        <label className="radioOptions__box" key={value}>
          <input 
            type="radio" 
            name={name} 
            checked={value === selected} 
            onChange={() => onClickOption(value)} 
          />
          <div className='radioOptions__icon'></div>
          <p className='radioOptions__text'>{value}</p>
        </label>
      )}
    </>
  )
}

export default RadioOptions

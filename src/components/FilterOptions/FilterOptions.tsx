import React, { FC } from 'react'
import './FilterOptions.css'

interface IFilterOptions {
  options: string[],
  selected: string[],
  onClickOption: (value: string) => void
}

export const FilterOptions:FC<IFilterOptions> = ({options, selected, onClickOption}) => {
  return (
    <>
      {options.map(value => 
        <label className="filterOptions__checkbox" key={value}>
          <input 
            type="checkbox" 
            name="name" 
            checked={selected.includes(value)} 
            onChange={() => onClickOption(value)} 
          />
          <div className='checkbox__icon'></div>
          <p className='checkbox__text'>{value}</p>
        </label>
      )}
    </>
  )
}

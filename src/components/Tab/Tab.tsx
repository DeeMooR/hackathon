import React, { FC } from 'react'
import './Tab.css'

interface ITab {
  value: string,
  isSelected: boolean,
  onClickTab: (value: string) => void
}

const Tab:FC<ITab> = ({value, isSelected, onClickTab}) => {
  console.log(isSelected)
  return (
    <button
      className={`button__tab ${isSelected ? 'selected' : ''}`} 
      onClick={() => onClickTab(value)}
    >
      {value}
    </button>
  )
}

export default Tab

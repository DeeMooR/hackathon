import React, { FC, useState } from 'react'
import './Tabs.css'
import Tab from '../Tab';

interface ITabs {
  tab: string,
  onClickTab: (value: string) => void
}

const Tabs:FC<ITabs> = ({tab, onClickTab}) => {
  const facultiesTabs = ['Все факультеты', 'ФКП', 'ФИТУ', 'ИЭФ', 'ФКСиС', 'ФИБ', 'ФРЭ', 'ВФ'];
  return (
    <div className='tabs'>
      {facultiesTabs.map(v => 
        <Tab 
          value={v} 
          isSelected={(tab === v)} 
          key={v} 
          onClickTab={onClickTab}
        />
      )}
    </div>
  )
}

export default Tabs

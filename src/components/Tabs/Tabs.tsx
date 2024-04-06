import React, { useState } from 'react'
import './Tabs.css'
import Tab from '../Tab';

const Tabs = () => {
  const [selected, setSelected] = useState(['Все факультеты']);
  const faculties = ['Все факультеты', 'ФКП', 'ФИТиУ', 'ИЭФ', 'ФКСиС', 'ФИБ', 'ФРЭ', 'ВФ'];

  const onClickTab = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    setSelected(newSelected);
  }

  return (
    <div className='tabs'>
      {faculties.map(v => 
        <Tab 
          value={v} 
          isSelected={selected.includes(v)} 
          key={v} 
          onClickTab={onClickTab}
        />
      )}
    </div>
  )
}

export default Tabs

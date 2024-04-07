import React, { useState } from 'react'
import './Tabs.css'
import Tab from '../Tab';

const Tabs = () => {
  const [selected, setSelected] = useState<string[]>(['Все факультеты']);
  const facultiesTabs = ['Все факультеты', 'ФКП', 'ФИТиУ', 'ИЭФ', 'ФКСиС', 'ФИБ', 'ФРЭ', 'ВФ'];

  const onClickTab = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    setSelected(newSelected);
  }

  return (
    <div className='tabs'>
      {facultiesTabs.map(v => 
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

import React, { useState } from 'react'
import './Filters.css'

import arrow from "src/img/icons/Arrow.svg"
import close from "src/img/icons/Close.svg"
import FilterOptions from '../FilterOptions'

const Filters = () => {
  const [isFirstOpen, setFirstOpen] = useState(false);
  const [isSecondOpen, setSecondOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const onClickFirst = () => {
    setFirstOpen(!isFirstOpen);
  }
  const onClickSecond = () => {
    setSecondOpen(!isSecondOpen);
  }
  const cleanSelected = () => {
    setSelected([]);
  }
  const onClickOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    setSelected(newSelected);
  }
  const onClickCross = (value: string) => {
    const newSelected = selected.filter((item) => item !== value);
    setSelected(newSelected);
  }

  const firstOptions = ['Культурные', 'Образовательные', 'Спортивные'];
  const secondOptions = ['Свободный вход', 'С регистрацией'];

  return (
    <>
      <div className='filters'>
        <div className="filters__item">
          <div className={`filters__item-title ${isFirstOpen ? 'open' : ''}`} onClick={onClickFirst}>
            <p>Вид мероприятия</p>
            <img src={arrow} alt="arrow" />
          </div>
          {isFirstOpen && <FilterOptions options={firstOptions} selected={selected} onClickOption={onClickOption}/>}
        </div>
        <div className="filters__item">
          <div className={`filters__item-title ${isSecondOpen ? 'open' : ''}`} onClick={onClickSecond}>
            <p>Тип посещения</p>
            <img src={arrow} alt="arrow" />
          </div>
          {isSecondOpen && <FilterOptions options={secondOptions} selected={selected} onClickOption={onClickOption}/>}
        </div>
      </div>
      <div className={`filters__selected ${selected.length > 0 ? 'show' : ''}`}>
        {selected.map(value => 
          <div className='filters__selected-card' key={value}>
            <p>{value}</p>
            <div className='filters__selected-icon' onClick={() => onClickCross(value)}>
              <img src={close} alt="cross" />
            </div>
          </div>
        )}
        {selected.length > 0 &&
          <p className='filters__selected-clear' onClick={cleanSelected}>Очистить фильтры</p>
        }
      </div>
    </>
  )
}

export default Filters

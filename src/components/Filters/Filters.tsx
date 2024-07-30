import React, { FC, useState } from 'react'
import { FilterOptions } from 'src/components';
import { arrowIcon, crossIcon } from 'src/assets';
import './Filters.css'

interface IFilters {
  types: string[],
  visits: string[],
  clickType: (v: string[]) => void,
  clickVisit: (v: string[]) => void,
}

export const Filters:FC<IFilters> = ({types, visits, clickType, clickVisit}) => {
  const [isFirstOpen, setFirstOpen] = useState(false);
  const [isSecondOpen, setSecondOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const onClickFirst = () => {
    setFirstOpen(!isFirstOpen);
    setSecondOpen(false);
  }
  const onClickSecond = () => {
    setSecondOpen(!isSecondOpen);
    setFirstOpen(false);
  }
  const cleanSelected = () => {
    setFirstOpen(false);
    setSecondOpen(false);
    clickType([]);
    clickVisit([]);
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
            <img src={arrowIcon} alt="arrow" />
          </div>
          {isFirstOpen && 
            <div className="filters__options-container">
              <FilterOptions options={firstOptions} selected={types} onClickOption={clickType}/>
            </div>
          }
        </div>
        <div className="filters__item">
          <div className={`filters__item-title ${isSecondOpen ? 'open' : ''}`} onClick={onClickSecond}>
            <p>Тип посещения</p>
            <img src={arrowIcon} alt="arrow" />
          </div>
          {isSecondOpen && 
            <div className="filters__options-container">
              <FilterOptions options={secondOptions} selected={visits} onClickOption={clickVisit}/>
            </div>
          }
        </div>
      </div>
      <div className={`filters__selected ${selected.length > 0 ? 'show' : ''}`}>
        {selected.map(value => 
          <div className='filters__selected-card' key={value}>
            <p>{value}</p>
            <div className='filters__selected-icon' onClick={() => onClickCross(value)}>
              <img src={crossIcon} alt="cross" />
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

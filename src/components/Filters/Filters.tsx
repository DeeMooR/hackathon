import React, { FC, useEffect, useState } from 'react'
import { FilterOptions } from 'src/components';
import { arrowIcon, crossIcon } from 'src/assets';
import './Filters.css'
import { clearEventsFilters, clearEventsFiltersItem, getEventsFilters, setEventsTypes, setEventsVisits, useAppDispatch, useAppSelector } from 'src/store';
import { allEventsTypes, allEventsVisits } from 'src/helpers';

export const Filters = () => {
  const dispatch = useAppDispatch();
  const { types, visits } = useAppSelector(getEventsFilters);
  const [activeFilter, setActiveFilter] = useState<'type' | 'visit' | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected([...types, ...visits]);
  }, [types, visits])

  const onClickNameFilter = (value: 'type' | 'visit') => {
    setActiveFilter(prev => (prev === value ? null : value));
  }
  const updateEventsTypes = (value: string) => {
    dispatch(setEventsTypes(value));
  }
  const updateEventsVisits = (value: string) => {
    dispatch(setEventsVisits(value));
  }
  
  const clearSelected = () => {
    dispatch(clearEventsFilters());
  }
  const clearSelectedItem = (value: string) => {
    dispatch(clearEventsFiltersItem(value));
  }

  return (
    <div className='filters'>
      <div className='filters__choice'>
        <div className="filters__item">
          <div className={`filters__item-title ${activeFilter === 'type' ? 'open' : ''}`} onClick={() => onClickNameFilter('type')}>
            <p>Вид мероприятия</p>
            <img src={arrowIcon} alt="arrow" />
          </div>
          {activeFilter === 'type' && 
            <div className="filters__options-container">
              <FilterOptions options={allEventsTypes} selected={types} onClickOption={updateEventsTypes}/>
            </div>
          }
        </div>
        <div className="filters__item">
          <div className={`filters__item-title ${activeFilter === 'visit' ? 'open' : ''}`} onClick={() => onClickNameFilter('visit')}>
            <p>Тип посещения</p>
            <img src={arrowIcon} alt="arrow" />
          </div>
          {activeFilter === 'visit' && 
            <div className="filters__options-container">
              <FilterOptions options={allEventsVisits} selected={visits} onClickOption={updateEventsVisits}/>
            </div>
          }
        </div>
      </div>
      <div className={`filters__selected ${selected.length > 0 ? 'show' : ''}`}>
        {selected.map(value => 
          <div className='filters__selected-card' key={value}>
            <p>{value}</p>
            <div className='filters__selected-icon' onClick={() => clearSelectedItem(value)}>
              <img src={crossIcon} alt="cross" />
            </div>
          </div>
        )}
        {selected.length > 0 &&
          <p className='filters__selected-clear' onClick={clearSelected}>Очистить фильтры</p>
        }
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { clearEventsFilters, clearEventsFiltersItem, getEventsSelector, getEventsFiltersSelector, setEventsErrorMessage, useAppDispatch, useAppSelector } from 'src/store';
import { FilterItem } from 'src/components';
import { ActionGetEvents } from 'src/helpers';
import { crossIcon } from 'src/assets';
import './Filters.css'

export const Filters = () => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector(getEventsSelector);
  const { types, visits } = useAppSelector(getEventsFiltersSelector);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected([...types, ...visits]);
  }, [types, visits])

  const getAllEvents = () => {
    if (page) dispatch(ActionGetEvents[page]);
    else dispatch(setEventsErrorMessage('Ошибка фильтрации мероприятий'));
  }
  
  const clearSelected = () => {
    dispatch(clearEventsFilters());
    getAllEvents();
  }
  const clearSelectedItem = (value: string) => {
    dispatch(clearEventsFiltersItem(value));
    getAllEvents();
  }

  return (
    <div className='filters'>
      <div className='filters__choice'>
        <FilterItem 
          type='type' 
          selected={types}
          getAllEvents={getAllEvents}
        />
        <FilterItem 
          type='visit'
          selected={visits}
          getAllEvents={getAllEvents}
        />
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

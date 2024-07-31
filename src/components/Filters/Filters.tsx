import React, { useEffect, useState } from 'react'
import { clearEventsFilters, clearEventsFiltersItem, getEventsFilters, useAppDispatch, useAppSelector } from 'src/store';
import { FilterItem } from 'src/components';
import { crossIcon } from 'src/assets';
import './Filters.css'

export const Filters = () => {
  const dispatch = useAppDispatch();
  const { types, visits } = useAppSelector(getEventsFilters);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected([...types, ...visits]);
  }, [types, visits])
  
  const clearSelected = () => {
    dispatch(clearEventsFilters());
  }
  const clearSelectedItem = (value: string) => {
    dispatch(clearEventsFiltersItem(value));
  }

  return (
    <div className='filters'>
      <div className='filters__choice'>
        <FilterItem 
          type='type' 
          selected={types}
        />
        <FilterItem 
          type='visit'
          selected={visits}
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

import React, { FC, useEffect, useRef, useState } from 'react'
import { getEvents, setEventsActiveFilter, useAppDispatch, useAppSelector } from 'src/store'
import { FilterOptions } from 'src/components'
import { arrowIcon } from 'src/assets'
import { FilterItemData, FilterItemFuncUpdate } from './config'
import './FilterItem.css'

interface IFilterItem {
  type: 'type' | 'visit',
  selected: string[],
}

export const FilterItem:FC<IFilterItem> = ({ type, selected }) => {
  const dispatch = useAppDispatch();
  const { activeFilter } = useAppSelector(getEvents);
  const { title, options } = FilterItemData[type];
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(activeFilter === type);
  }, [activeFilter])
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        dispatch(setEventsActiveFilter(null));
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [ref]);

  const updateFilters = (value: string) => {
    const func = FilterItemFuncUpdate[type](value);
    dispatch(func);
  }

  const setActiveFilter = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dispatch(setEventsActiveFilter(isOpen ? null : type));
  }

  return (
    <div className="filterItem">
      <div className={`filterItem__title ${isOpen ? 'open' : ''}`} onClick={setActiveFilter}>
        <p>{title}</p>
        <img src={arrowIcon} alt="arrow" />
      </div>
      {isOpen && 
        <div className="filterItem__options-container" ref={ref}>
          <FilterOptions options={options} selected={selected} onClickOption={updateFilters}/>
        </div>
      }
    </div>
  )
}

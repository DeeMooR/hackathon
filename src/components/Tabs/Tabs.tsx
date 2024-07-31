import React from 'react'
import { Tab } from 'src/components';
import './Tabs.css'
import { getEventsFilters, setEventsFaculties, useAppDispatch, useAppSelector } from 'src/store';
import { allFaculties } from 'src/helpers';

export const Tabs = () => {
  const dispatch = useAppDispatch();
  const { faculties } = useAppSelector(getEventsFilters);
  const allTabs = ['Все факультеты', ...allFaculties];

  const checkIsSelected = (value: string) => {
    if (!faculties.length && value === 'Все факультеты') return true;
    return faculties.includes(value);
  }

  const onClickTab = (value: string) => {
    dispatch(setEventsFaculties(value))
  }

  return (
    <div className='tabs'>
      {allTabs.map(value =>
        <Tab 
          value={value}
          isSelected={checkIsSelected(value)} 
          onClickTab={onClickTab}
          key={value} 
        />
      )}
    </div>
  )
}

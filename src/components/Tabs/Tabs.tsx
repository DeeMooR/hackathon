import React from 'react'
import { Tab } from 'src/components';
import './Tabs.css'
import { getEventsSelector, getEventsFiltersSelector, setEventsErrorMessage, setEventsFaculties, useAppDispatch, useAppSelector } from 'src/store';
import { ActionGetEvents, allFaculties } from 'src/helpers';

export const Tabs = () => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector(getEventsSelector);
  const { faculties } = useAppSelector(getEventsFiltersSelector);
  const allTabs = ['Все факультеты', ...allFaculties];

  const checkIsSelected = (value: string) => {
    if (!faculties.length && value === 'Все факультеты') return true;
    return faculties.includes(value);
  }

  const onClickTab = (value: string) => {
    dispatch(setEventsFaculties(value));
    if (page) dispatch(ActionGetEvents[page]);
    else dispatch(setEventsErrorMessage('Ошибка фильтрации мероприятий'));
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

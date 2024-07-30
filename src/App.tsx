import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getEventsNextAPI, getEventsPastAPI } from 'src/store/requests'
import { useDispatch } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { AdminPage, AuthPage, ContactsPage, EventPage, EventsPage, MainPage } from './pages';

function App() {
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  
  useEffect(() => {
    dispatch(getEventsNextAPI());
    dispatch(getEventsPastAPI());
  }, [])

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/next' element={<EventsPage type='next' />} />
      <Route path='/past' element={<EventsPage type='past' />} />
      <Route path='/next/:id' element={<EventPage type='next'/>} />
      <Route path='/past/:id' element={<EventPage type='past'/>} />
      <Route path='/contacts' element={<ContactsPage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

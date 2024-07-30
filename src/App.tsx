import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getEventsNextAction, useAppDispatch } from './store';
import { getEventsPastAPI } from 'src/store/requests'
import { AdminPage, AuthPage, ContactsPage, EventPage, EventsPage, MainPage } from './pages';

function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getEventsNextAction());
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

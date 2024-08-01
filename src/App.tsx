import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminPage, AuthPage, ContactsPage, EventPage, EventsPage, MainPage } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/next' element={<EventsPage page='next' />} />
      <Route path='/past' element={<EventsPage page='past' />} />
      <Route path='/next/:id' element={<EventPage page='next'/>} />
      <Route path='/past/:id' element={<EventPage page='past'/>} />
      <Route path='/contacts' element={<ContactsPage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

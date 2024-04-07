import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import EventsPage from './pages/EventsPage';
import ContactsPage from './pages/ContactsPage';
import AuthPage from './pages/AuthPage';

function App() {
  

  return (
    <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/next' element={<EventsPage type='next' />} />
        <Route path='/past' element={<EventsPage type='past' />} />
        <Route path='/contacts' element={<ContactsPage />} />
        <Route path='/auth' element={<AuthPage />} />
    </Routes>
  );
}

export default App;

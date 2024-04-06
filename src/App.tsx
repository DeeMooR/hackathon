import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import EventsPage from './pages/EventsPage';

function App() {
  

  return (
    <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/next' element={<EventsPage type='next' />} />
        <Route path='/past' element={<EventsPage type='past' />} />
    </Routes>
  );
}

export default App;

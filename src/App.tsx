import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ApplicationList from './pages/ApplicationList';
import ApplicationDetails from './pages/ApplicationDetails';
import ComponentDetails from './pages/ComponentDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationList />} />
      <Route path="/application/:id" element={<ApplicationDetails />} />
      <Route path="/component/:id" element={<ComponentDetails />} />
    </Routes>
  );
}

export default App;
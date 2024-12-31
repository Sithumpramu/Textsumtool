import Dashboard from './Dashboard'
import History from './History';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
   
      <Router>
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/History" element={<History />} />
        </Routes>
      </Router>
   
  );
}

export default App;
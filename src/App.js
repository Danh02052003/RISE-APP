import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashBoard from './pages/DashBoard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/rise" element={<HomePage />} />
        <Route path="/dash-board" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
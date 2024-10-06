import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/rise" element={<HomePage />} />
        {/* Add more routes for other pages here */}
      </Routes>
    </Router>
  );
}

export default App;
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AppointmentScheduler from './components/AppointmentScheduler'; // Corrected import

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/appointments" element={<AppointmentScheduler />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

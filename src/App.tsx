import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/SignUpFrom';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;

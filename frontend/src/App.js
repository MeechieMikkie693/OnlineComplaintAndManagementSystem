// src/App.js
import './App.css';
import SignUp from './SignUp/SignUp';
import Landing from './Landing/Landing';
import Studentdash from './Studentdash';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/users' element={<SignUp onLogin={handleLogin} />} />
        <Route path='/dashboard' element={isLoggedIn ? <Studentdash /> : <SignUp onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;

// src/App.js
import './App.css';
import SignUp from './SignUp/SignUp';
import Landing from './Landing/Landing';
import Studentdash from './Student/studentdash';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';
import Employeedash from './Employee/EmployeeDash';
import AdminDash from './Admin/AdminDash';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing /> } />
        <Route path='/users' element={<SignUp />} />  {/*onLogin={handleLogin}*/}
        <Route path='/studentdashboard' element={<Studentdash/>}/>
        <Route path='/employeedashboard' element={<Employeedash/>}/>
        <Route path='/admindashboard' element={<AdminDash/>}/>
        
        {/* <Route path='/dashboard' element={isLoggedIn ? <Studentdash /> : <SignUp onLogin={handleLogin} />} /> */}
      </Routes>
    </Router>

  );
}

export default App;

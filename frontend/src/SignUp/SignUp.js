import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

export default function SignUp({
  onLogin}) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [roll, setRoll] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Student');
  const [pass, setPass] = useState('');

  const showSignUp = () => {
    setIsSignUp(true);
  };

  const showLogin = () => {
    setIsSignUp(false);
  };

  const toggleRole = () => {
    setRole(role === 'Student' ? 'Problem Solver' : 'Student');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        roll: roll,
        email: email,
        role: role,
        pass: pass
      };
      const response = await axios.post('http://localhost:8000/api/users', newUser);
      console.log('User created:', response.data);
      onLogin();
      // Optionally, you can redirect or show a success message
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error: Display an alert or set an error state
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${email}`);
      console.log('User found:', response.data);
      // Validate password or redirect to dashboard on success
      if(response.data){
        console.log('Login successful');
        onLogin();
        //Redirect or handle successful login
      }else{
        console.log('Invalid password');
        //Handle invalid password
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid Credentials');
      // Handle error: Display an alert or set an error state
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>
          <span className={isSignUp ? 'active' : 'inactive'} onClick={showSignUp}>
            Sign Up
          </span>
          <span className='active'>&nbsp;</span>
          <span className={!isSignUp ? 'active' : 'inactive'} onClick={showLogin}>
            Login
          </span>
        </div>
        <div className='underline'></div>
      </div>
      {isSignUp ? (
        <form className='inputs' onSubmit={handleSignUp}>
          <div>
            <button className="btn btn-dark header" type='button' onClick={toggleRole}>
              {role}
            </button>
            <span className='s20 header'>(Click to change)</span>
          </div>
          <div className='input'>
            <img src={user_icon} alt='' />
            <input
              type='text'
              placeholder='Roll'
              className='roll'
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              required
            />
          </div>
          <div className='input'>
            <img src={email_icon} alt='' />
            <input
              type='email'
              placeholder='Email Id'
              className='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input'>
            <img src={password_icon} alt='' />
            <input
              type='password'
              placeholder='Password'
              className='pass'
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <button type='submit' className="btn btn-dark">
            Sign Up
          </button>
        </form>
      ) : (
        <form className='inputs' onSubmit={handleLogin}>
          <div className='input'>
            <img src={email_icon} alt='' />
            <input
              type='email'
              placeholder='Email Id'
              className='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input'>
            <img src={password_icon} alt='' />
            <input
              type='password'
              placeholder='Password'
              className='pass'
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <div className='forgot-password'>
            Forgot Password? <span>Can't Change</span>
          </div>
          <button type='submit' className="btn btn-dark">
            Login
          </button>
        </form>
      )}
    </div>
  );
}

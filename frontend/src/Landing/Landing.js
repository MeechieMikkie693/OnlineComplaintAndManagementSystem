
import React from 'react';
import './Landing.css'
import homeImg from '../Assets/homeimg.png'; // Replace with your home image path
import { Link } from 'react-router-dom';
export default function Landing() {
  return (
    <div className='landing'>
      <header>
        <h2 className="logo">Resolve Radar</h2>
        <nav className='navigation'>
          <a href="/#home">Home</a>
          <a href="/#about">About</a>
          <a href="/#services">Services</a>
          <Link to="/users">Login/SignUp</Link>
        </nav>
      </header>
      <section id="home" className="home-section">
        <div className="home-content">
          <div className="text">
            <h1>Welcome to our Student Complaint Management System!</h1>
            <p style={{ fontSize: '20px', marginTop:'20px' }}> &emsp; Our platform is dedicated to ensuring that every student's voice is heard and every issue is addressed promptly. Whether it's a problem with facilities, academic concerns, or any other issue, we're here to help you get the resolution you need.</p>
            <ul>
              <li style={{ fontSize: '20px' }}>Easy complaint registration process</li>
              <li style={{ fontSize: '20px' }}>Real-time tracking of complaint status</li>
              <li style={{ fontSize: '20px' }}>Notifications for updates on your complaints</li>
              <li style={{ fontSize: '20px' }}>Dedicated problem solvers to ensure timely resolutions</li>
            </ul>
          </div>
          <div className="image">
            <img src={homeImg} alt="Home" />
          </div>
        </div>
      </section>
      <section id="about" className="about-section">
        <h2><u>About Us</u></h2>
        <p>The Student Complaint Management System is designed to streamline the process of addressing student issues and ensuring they are resolved efficiently. Our goal is to provide a transparent, user-friendly platform where students can raise their concerns without hesitation.</p>
      </section>
      <section id="services" className="services-section">
        <h2 style={{color: 'white'}}>Our Services</h2>
        <div className="card-container">
          <div className="card">
            <h3>Complaint Registration</h3>
            <p>Easily register your complaints through our user-friendly platform. Provide all necessary details to help us understand and address your issue better.</p>
          </div>
          <div className="card">
            <h3>Real-Time Tracking</h3>
            <p>Keep track of your complaint's status in real-time. Receive notifications and updates as your complaint moves through the resolution process.</p>
          </div>
          <div className="card">
            <h3>Feedback and Improvements</h3>
            <p>Your feedback is valuable to us. After your complaint is resolved, provide feedback to help us improve our services and make the system even better for future users.</p>
          </div>
        </div>
      </section>
      <footer>
        <p>&copy; 2024 Student Complaint Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
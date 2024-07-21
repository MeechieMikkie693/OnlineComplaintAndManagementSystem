import React, { useState,useEffect } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const storedId = localStorage.getItem('userId');
  useEffect(() => {
    // Retrieve email from local storage (or state management)
    setUserId(storedId);
  }, [storedId]);



  const handleLogOut = async(e)=>{
    e.preventDefault();
    navigate(`/`);
  }

  return (
    <Card className="bg-light text-dark">
      <Card.Body>
        <Button variant="dark" type="button" onClick={handleLogOut} style={{margin:'20px'}} >Logout</Button>
      </Card.Body>
    </Card>
  );
};

export default Logout;

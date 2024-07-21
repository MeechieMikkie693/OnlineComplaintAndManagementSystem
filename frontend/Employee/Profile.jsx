import React, { useState,useEffect } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Handle profile update logic
    console.log('Updated Email:', email);
    const response = await axios.put(`http://localhost:8000/employees/users/updateProfile/${userId}`, {
      email:email,
      password: password,
    });
      console.log('Updated Successfully',response.data)

    // Set the update success flag
    setUpdateSuccess(true);

    // Reset the form after submission
    setEmail('');
    setPassword('');
    } catch (error) {
      console.log(error)
    }
    
  };

  const handleLogOut = async(e)=>{
    e.preventDefault();
    navigate(`/`);
  }

  return (
    <Card className="bg-light text-dark">
      <Card.Body>
        <h3>Update Profile</h3>
        {updateSuccess && <Alert variant="success" onClose={() => setUpdateSuccess(false)} dismissible>Profile updated successfully!</Alert>}
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Form.Group>
          <Button variant="dark" type="submit" style={{marginTop:'20px', marginLeft:'20px'}}>Update</Button><br></br>
        </Form>
        <Button variant="dark" type="button" onClick={handleLogOut} style={{margin:'20px'}}>Logout</Button>
      </Card.Body>
    </Card>
  );
};

export default Profile;

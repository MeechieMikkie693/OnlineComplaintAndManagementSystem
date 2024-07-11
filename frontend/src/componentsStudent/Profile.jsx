import React, { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic
    console.log('Updated Email:', email);
    console.log('Updated Password:', password);

    // Set the update success flag
    setUpdateSuccess(true);

    // Reset the form after submission
    setEmail('');
    setPassword('');
  };

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
          <Button variant="dark" type="submit">Update</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container ,Button} from 'react-bootstrap';
import axios from 'axios';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [userId, setUserId] = useState('');
  const storedId = localStorage.getItem('userId');
  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/complaints/studentdashboard/${storedId}`);
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      // Handle error: Display an alert or set an error state
    }
  };
  useEffect(() => {
    fetchComplaints();
    setUserId(storedId);
  }, [userId]);

  const refreshPage = async () => {
    fetchComplaints();
  }

  return (
    <div className="container mt-4" style={{borderRadius:"10px"}}>
      <Card>
        <Card.Header><h1>My Complaints</h1></Card.Header>
        <Card.Body style={{width:"70%"}}>
          <Container className="mt-3">
            <Row>
              {complaints
                .slice()
                .sort((a, b) => a.category.localeCompare(b.category))
                .map((complaint, index) => (
                  <Col xs={12} className="mb-4" key={index}>
                    <Card
                      style={{
                        backgroundColor: complaint.status === 'Done' ? 'green' :
                          complaint.status === 'In Progress' ? 'yellow' : 'black',
                        color: complaint.status === 'Done' ? 'white' :
                          complaint.status === 'In Progress' ? 'black' : 'white'
                      }}
                    >
                      <Card.Body>
                        <Card.Title>{complaint.category.split('. ')[1]}:</Card.Title>
                        <Card.Text>{complaint.complaintText}</Card.Text>
                        <Card.Text>Status: {complaint.status}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Container>
        </Card.Body>
        <Button style={{width:"50%"}}variant="dark" onClick={() => {refreshPage()}}>Refresh</Button>
      </Card>
    </div>
  );
};

export default MyComplaints;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Container, Form } from 'react-bootstrap';
import axios from 'axios';

const SubmitFeedback = () => {
  const [complaints, setComplaints] = useState([]);
  const [feedbackText, setFeedbackText] = useState('');
  const [currentComplaintId, setCurrentComplaintId] = useState(null);
  const storedId = localStorage.getItem('userId');

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/complaints/studentdashboard/Done/${storedId}`);
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [storedId]);

  const handleFeedbackChange = (e) => setFeedbackText(e.target.value);

  const handleSubmitFeedback = async (complaintId) => {
      try {
        await axios.put(`http://localhost:8000/complaints/studentdashboard/submitFeedback/${complaintId}`, {
          feedback: feedbackText
        });
        alert('Feedback submitted successfully!');
        setFeedbackText(''); // Clear feedback text after submission
        
        await axios.delete(`http://localhost:8000/complaints/deleteComplaint/${complaintId}`);

        fetchComplaints(); // Refresh complaints list

      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
  };

  return (
    <div className="container mt-4" style={{borderRadius:"10px"}}>
      <Card>
        <Card.Header><h1>Submit Your Feedbacks</h1></Card.Header>
        <Card.Body>
          <Container className="mt-3">
            <Row>
              {complaints
                .slice()
                .sort((a, b) => a.category.localeCompare(b.category))
                .map((complaint, index) => (
                  <Col xs={12} className="mb-4" key={index}>
                    <Card className="w-100"
                      style={{
                        backgroundColor: complaint.status === 'Done' ? 'green' :
                          complaint.status === 'In Progress' ? 'yellow' : 'black',
                        color: complaint.status === 'Done' ? 'white' :
                          complaint.status === 'In Progress' ? 'black' : 'white'
                      }}
                    >
                      <Card.Body>
                        <Row className="align-items-center">
                          <Col>
                            <Card.Title>{complaint.category.split('. ')[1]}</Card.Title>
                            <Card.Text>{complaint.complaintText}</Card.Text>
                            <Form.Group controlId="feedback">
                              <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your feedback here"
                                value={feedbackText}
                                onChange={handleFeedbackChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col className="d-flex justify-content-end">
                            <Button
                              variant="primary"
                              onClick={() => {
                                setCurrentComplaintId(complaint._id);
                                handleSubmitFeedback(complaint._id);
                                
                              }}
                            >
                              Submit
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SubmitFeedback;

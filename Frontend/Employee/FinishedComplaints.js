import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container,Button } from 'react-bootstrap';
import axios from 'axios';

const SolvedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const fetchComplaints = async (status) => {
    try {
      const response = await axios.get(`http://localhost:8000/complaints/employeedashboard/Done`);
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const refreshPage = async () => {
    fetchComplaints();
  }


  return (
    <div className="container mt-4" style={{borderRadius:"10px"}}>
      <Card>
        <Card.Header><h1>Finished Complaints</h1></Card.Header>
        <Card.Body>
          <Container className="mt-3">
            <Row>
              {complaints
                .slice()
                .sort((a, b) => a.category.localeCompare(b.category))
                .map((complaint, index) => (
                  <Col xs={12} className="mb-4" key={index}>
                    <Card
                      style={{
                        backgroundColor: 'black',
                        color:'white'
                      }}
                    >
                      <Card.Body>
                      <Card.Body>
                        <Card.Title>{complaint.category.split('. ')[1]}:</Card.Title>
                        <Card.Text>{complaint.complaintText}</Card.Text>
                        </Card.Body>
                        <Card.Body style={{backgroundColor:"red"}}>
                        <Card.Title>Student Feedback:</Card.Title>
                        <Card.Text>{complaint.feedback}</Card.Text>
                        </Card.Body>
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

}//FinishedComplaints.jsx

export default SolvedComplaints;
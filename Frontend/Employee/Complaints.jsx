import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchComplaint, setSearchComplaint] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8000/complaints/employeedashboard');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleSearchComplaintChange = (e) => setSearchComplaint(e.target.value);
  const handleFilterCategoryChange = (e) => setFilterCategory(e.target.value);

  const markAsPending = async (id) => {
      try {
        await axios.put(`http://localhost:8000/complaints/markAsPending/${id}`);
        setComplaints(complaints.map(complaint => complaint._id === id ? { ...complaint, status: 'Pending' } : complaint));
      } catch (error) {
        console.error('Error marking as pending:', error);
      }
  };

  const markAsDone = async (id) => {
    if (window.confirm('Are you sure you want to mark this complaint as Done?')) {
      try {
        await axios.put(`http://localhost:8000/complaints/markAsDone/${id}`);
        setComplaints(complaints.map(complaint => complaint._id === id ? { ...complaint, status: 'Done' } : complaint));
      } catch (error) {
        console.error('Error marking as done:', error);
      }
    }
  };

  const markAsInProgress = async (id) => {
    try {
      await axios.put(`http://localhost:8000/complaints/markAsInProgress/${id}`);
      setComplaints(complaints.map(complaint => complaint._id === id ? { ...complaint, status: 'In Progress' } : complaint));
    } catch (error) {
      console.error('Error marking as in progress:', error);
    }
  };

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.complaintText.toLowerCase().includes(searchComplaint.toLowerCase()) && complaint.status !== 'Done' &&
      (!filterCategory || complaint.category === filterCategory)
  );

  return (
    <div className="container mt-4" style={{borderRadius:"10px"}}>
      <Card>
        <Card.Header><h1>Pending Complaints</h1></Card.Header>
        <Card.Body style={{width:"70%"}}>
          <div className="form-group mt-3">
            <select
              className="form-control"
              value={filterCategory}
              onChange={handleFilterCategoryChange}
            >
              <option value="" disabled>Choose a category</option>
              <option value="1. Safety and Security">Safety and Security</option>
              <option value="2. Maintenance and Repairs">Maintenance and Repairs</option>
              <option value="3. Facilities and Amenities">Facilities and Amenities</option>
              <option value="4. Hygiene and Cleanlines">Hygiene and Cleanliness</option>
              <option value="5. Booking and Payments">Booking and Payments</option>
              <option value="6. Food and Dining">Food and Dining</option>
              <option value="7. Staff and Management">Staff and Management</option>
              <option value="8. Room Assignments and Accommodation">Room Assignments and Accommodation</option>
              <option value="9. Miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <Container className="mt-3">
            <Row>
              {filteredComplaints
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
                          <Card.Title>{complaint.category.split('. ')[1]}</Card.Title>
                          <Card.Text>{complaint.complaintText}</Card.Text>
                          <Row>
                          <Button style={{width:"33%"}} variant="secondary" onClick={() => markAsPending(complaint._id)} className="mr-2">Pending</Button>
                          <Button style={{width:"33%"}} variant="warning" onClick={() => markAsInProgress(complaint._id)} className="mr-2">In Progress</Button>
                          <Button style={{width:"33%"}}variant="success" onClick={() => markAsDone(complaint._id)}>Done</Button>
                          </Row>
                            
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

export default Complaints;

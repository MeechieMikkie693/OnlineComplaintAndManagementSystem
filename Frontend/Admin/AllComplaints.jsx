import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

const SearchComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchComplaint, setSearchComplaint] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [searchStudent, setSearchStudent] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8000/complaints/studentdashboard');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        // Handle error: Display an alert or set an error state
      }
    };

    fetchComplaints();
  }, []);

  const handleSearchComplaintChange = (e) => setSearchComplaint(e.target.value);
  const handleFilterCategoryChange = (e) => setFilterCategory(e.target.value);
  const handleSearchStudentChange = (e) => setSearchStudent(e.target.value);

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

  const deleteComplaint = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/complaints/deleteComplaint/${id}`);
      setComplaints(complaints.filter(complaint => complaint._id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.complaintText.toLowerCase().includes(searchComplaint.toLowerCase()) &&
      (!filterCategory || complaint.category === filterCategory) && complaint.studentId.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <div className="container mt-1" style={{borderRadius:"10px"}}>
    <Card >
      <Card.Body style={{width:"70%"}}>
        <h3>Search Complaints</h3>
        <div className="form-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder='Search by Complaint'
            value={searchComplaint}
            onChange={handleSearchComplaintChange}
          />
          
        </div>
        <div className="form-group mt-3">
          <select
              className="form-control"
              value={filterCategory}
              onChange={handleFilterCategoryChange}
            >
              <option value="" disabled>Filter by Category</option>
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
        <div className="form-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder='Search by StudentId'
            value={searchStudent}
            onChange={handleSearchStudentChange}
          />
          
        </div>
        <Container className="mt-3">
        <Row>
          {filteredComplaints
          .slice() // Create a copy of the array to avoid mutating the original
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
                <Row className="align-items-center">
                  <Card.Title>{complaint.category.split('. ')[1]}</Card.Title>
                    <Card.Text>{complaint.complaintText}</Card.Text>
                      <Row>
                        <Button style={{width:"33%"}} variant="success" onClick={() => markAsDone(complaint._id)} className="mr-2">Done</Button>
                        <Button style={{width:"33%"}} variant="warning" onClick={() => markAsInProgress(complaint._id)}>In Progress</Button>
                        <Button style={{width:"33%"}} variant="danger" onClick={() => deleteComplaint(complaint._id)} className="mr-2">Delete</Button>
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
};

export default SearchComplaints;

// src/App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Tab, Row, Col } from 'react-bootstrap';
import SubmitComplaint from './SubmitComplaint';
import MyComplaints from './MyComplaints';
import SearchComplaints from './SearchComplaints';

const Studentdash = () => {
  const [complaints, setComplaints] = useState([]);
  
  const addComplaint = (complaint) => {
    setComplaints([...complaints, complaint]);
  };

  return (
    <div className="container" style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Student Dashboard</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#submit">Submit Complaint</Nav.Link>
          <Nav.Link href="#my">My Complaints</Nav.Link>
          <Nav.Link href="#search">Search Complaints</Nav.Link>
        </Nav>
      </Navbar>

      <Tab.Container defaultActiveKey="#submit">
        <Row className="mt-4">
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="#submit">Submit Complaint</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#my">My Complaints</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#search">Search Complaints</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#submit">
                <SubmitComplaint addComplaint={addComplaint} />
              </Tab.Pane>
              <Tab.Pane eventKey="#my">
                <MyComplaints complaints={complaints} />
              </Tab.Pane>
              <Tab.Pane eventKey="#search">
                <SearchComplaints complaints={complaints} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Studentdash;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav,  Tab, Row, Col } from 'react-bootstrap';

import FinishedComplaints from './FinishedComplaints';
import Complaints from './Complaints';
import Profile from './Profile'



export default function Employeedash() {
  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Resolve Radar</Navbar.Brand>
        <Navbar.Brand href="#home">Employee Dashboard</Navbar.Brand>
        {/* <Nav className="mr-auto">
          <Nav.Link href="#complaints">Complaints</Nav.Link>
          <Nav.Link href="#finishedcomplaints">Finished Complaints</Nav.Link>
          
        </Nav> */}
      </Navbar>
    
      <Tab.Container defaultActiveKey="#complaints">
        <Row className="mt-4">
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="#complaints">Complaints</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#finishedcomplaints">Finished Complaints</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#profile">Your Profile</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#complaints">
                <Complaints addComplaint={Complaints} />
              </Tab.Pane>
              <Tab.Pane eventKey="#finishedcomplaints">
                <FinishedComplaints complaints={FinishedComplaints} />
              </Tab.Pane>
              <Tab.Pane eventKey="#profile">
                <Profile />
              </Tab.Pane>
            
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

//Employeedash.js
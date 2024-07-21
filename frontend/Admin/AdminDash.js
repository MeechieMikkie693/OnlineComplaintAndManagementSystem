import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav,  Tab, Row, Col } from 'react-bootstrap';
import AllComplaints from './AllComplaints';
import Logout from './Logout';




export default function AdminDash() {
  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">ResolveRadar</Navbar.Brand>
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
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
                <Nav.Link eventKey="/">Logout</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#complaints">
                <AllComplaints addComplaint={AllComplaints} />
              </Tab.Pane>
              <Tab.Pane eventKey="/">
                <Logout />
              </Tab.Pane>
            
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

//Employeedash.js
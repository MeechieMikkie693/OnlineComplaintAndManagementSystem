import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container,Button } from 'react-bootstrap';
import axios from 'axios';

const SearchComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchComplaint, setSearchComplaint] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:8000/complaints/studentdashboard');
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      // Handle error: Display an alert or set an error state
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const refreshPage = async () => {
    fetchComplaints();
  }

  const handleSearchComplaintChange = (e) => setSearchComplaint(e.target.value);
  const handleFilterCategoryChange = (e) => setFilterCategory(e.target.value);

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.complaintText.toLowerCase().includes(searchComplaint.toLowerCase()) &&
      (!filterCategory || complaint.category === filterCategory)
  );

  return (
    <div className="container mt-4" style={{borderRadius:"10px"}}>
      
    <Card>
    <Card.Header style={{color:"black"}}><h1>Search Complaints</h1></Card.Header>
      <Card.Body style={{width:"50%"}}>  
        <div className="form-group">
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
        </Card.Body>
        <Card.Body style={{width:"70%"}}>
          <Container className="mt-3">
            <Row>
              {filteredComplaints
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

export default SearchComplaints;


// <div className="container mt-4" style={{borderRadius:"10px"}}>
//       <Card>
//         <Card.Header><h1>Finished Complaints</h1></Card.Header>
//         <Card.Body>
//           <Container className="mt-3">
//             <Row>
//               {complaints
//                 .slice()
//                 .sort((a, b) => a.category.localeCompare(b.category))
//                 .map((complaint, index) => (
//                   <Col xs={12} className="mb-4" key={index}>
//                     <Card
//                       style={{
//                         backgroundColor: complaint.status === 'Done' ? 'green' :
//                           complaint.status === 'In Progress' ? 'yellow' : 'black',
//                         color: complaint.status === 'Done' ? 'white' :
//                           complaint.status === 'In Progress' ? 'black' : 'white'
//                       }}
//                     >
//                       <Card.Body>
//                         <Card.Title>{complaint.category.split('. ')[1]}:</Card.Title>
//                         <Card.Text>{complaint.complaintText}</Card.Text>
//                         <Card.Text>Status: {complaint.status}</Card.Text>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 ))}
//             </Row>
//           </Container>
//         </Card.Body>
//       </Card>
//     </div>
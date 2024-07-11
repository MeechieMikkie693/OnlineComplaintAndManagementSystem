import React from 'react';
import { Card } from 'react-bootstrap';

const MyComplaints = ({ complaints }) => {
  return (
    <Card className="bg-light text-dark">
      <Card.Body>
        <h3>My Complaints</h3>
        <ul className="list-group">
          {complaints.map((complaint, index) => (
            <li key={index} className="list-group-item" style={{ backgroundColor: 'black', color: 'white' }}>
              {complaint.complaint} - <em>{complaint.category}</em>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default MyComplaints;

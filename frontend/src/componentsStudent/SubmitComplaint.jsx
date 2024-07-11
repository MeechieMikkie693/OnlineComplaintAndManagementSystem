import React, { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';

const SubmitComplaint = ({ addComplaint }) => {
  const [newComplaint, setNewComplaint] = useState('');
  const [category, setCategory] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleNewComplaintChange = (e) => setNewComplaint(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    const newEntry = { complaint: newComplaint, category: category };
    addComplaint(newEntry);
    //set the submit success flag
    setSubmitSuccess(true);

    //Reset the form after submission
    setNewComplaint('');
    setCategory('');
  };

  return (
    <Card className="bg-light text-dark">
      <Card.Body>
        <h3>New Complaint</h3>
        {submitSuccess && <Alert variant = "success" onClose={() => setSubmitSuccess(false)} dismissible>Complaint submitted successfully!</Alert> }
        <form onSubmit={handleSubmitComplaint}>
          <div className="form-group">
            <label>Complaint</label>
            <textarea
              className="form-control"
              value={newComplaint}
              onChange={handleNewComplaintChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>Select a Category</option>
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
          <button type="submit" className="btn btn-dark mt-2">Submit</button>
        </form>
      </Card.Body>
    </Card>
  );
};

export default SubmitComplaint;
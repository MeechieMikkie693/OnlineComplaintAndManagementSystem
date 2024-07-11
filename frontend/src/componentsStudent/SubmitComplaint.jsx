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

    // Set the submit success flag
    setSubmitSuccess(true);

    // Reset the form after submission
    setNewComplaint('');
    setCategory('');
  };

  return (
    <Card className="bg-light text-dark">
      <Card.Body>
        <h3>New Complaint</h3>
        {submitSuccess && <Alert variant="success" onClose={() => setSubmitSuccess(false)} dismissible>Complaint submitted successfully!</Alert>}
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
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={handleCategoryChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark mt-2">Submit</button>
        </form>
      </Card.Body>
    </Card>
  );
};

export default SubmitComplaint;

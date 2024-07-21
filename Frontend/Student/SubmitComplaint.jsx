import React, { useState ,useEffect} from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
const SubmitComplaint = () => {
  const [newComplaint, setNewComplaint] = useState('');
  const [category, setCategory] = useState('');
  const [userId, setUserId] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const storedId = localStorage.getItem('userId');
  useEffect(() => {
    // Retrieve email from local storage (or state management)
    setUserId(storedId);
  }, []);
  // const handleNewComplaintChange = (e) => {setNewComplaint(e.target.value)};
  // const handleCategoryChange = (e) => {setCategory(e.target.value)};

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    try{
      const newEntry = {
      complaintText: newComplaint,
      category: category,
      studentId: userId
      };
      console.log(storedId)
      // addComplaint(newEntry);
      //set the submit success flag
      const response = await axios.post('http://localhost:8000/complaints/studentdashboard', newEntry);
      console.log('Complaint submitted',response.data)
      setSubmitSuccess(true);

    //Reset the form after submission
      setNewComplaint('');
      setCategory('');
    }catch(error){
      console.log(error);
    }
  };
  return (
    <Card className="bg-light text-dark" style={{borderRadius:"10px"}}>
      <Card.Body>
        <h3>New Complaint</h3>
        {submitSuccess && <Alert variant = "success" onClose={() => setSubmitSuccess(false)} dismissible>Complaint submitted successfully!</Alert> }
        <form onSubmit={handleSubmitComplaint}>
          <div className="form-group">
            <label>Complaint</label>
            <textarea
              className="form-control"
              value={newComplaint}
              onChange={(e)=>setNewComplaint(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
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
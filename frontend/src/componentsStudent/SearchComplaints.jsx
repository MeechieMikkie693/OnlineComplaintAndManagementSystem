import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

const SearchComplaints = ({ complaints }) => {
  const [searchCategory, setSearchCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleSearchCategoryChange = (e) => setSearchCategory(e.target.value);
  const handleFilterCategoryChange = (e) => setFilterCategory(e.target.value);

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.category.toLowerCase().includes(searchCategory.toLowerCase()) &&
      complaint.category.toLowerCase().includes(filterCategory.toLowerCase())
  );

  return (
    <Card className="bg-light text-dark">
      <Card.Body>
        <h3>Search Complaints</h3>
        <div className="form-group">
          <label>Search by Category</label>
          <input
            type="text"
            className="form-control"
            value={searchCategory}
            onChange={handleSearchCategoryChange}
          />
        </div>
        <div className="form-group mt-3">
          <label>Filter by Category</label>
          <input
            type="text"
            className="form-control"
            value={filterCategory}
            onChange={handleFilterCategoryChange}
          />
        </div>
        <ul className="list-group mt-3">
          {filteredComplaints.map((complaint, index) => (
            <li key={index} className="list-group-item" style={{ backgroundColor: 'black', color: 'white' }}>
              {complaint.complaint} - <em>{complaint.category}</em>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default SearchComplaints;

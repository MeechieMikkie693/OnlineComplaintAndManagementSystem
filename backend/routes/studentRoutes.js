const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/studentControllers');

// Create a new student
router.post('/users/signup', studentController.createStudent);

// Authenticate a student
router.post('/users/login', studentController.authenticateStudent);

// Get student by ID and populate complaints
router.get('/:studentId', studentController.getStudentByStudentId);

// Add a complaint to a student
router.post('/:studentId/addComplaint', studentController.addComplaintToStudent);

// Update student profile (email or password)
router.put('/users/updateProfile/:studentId', studentController.updateStudentProfile);

module.exports = router;

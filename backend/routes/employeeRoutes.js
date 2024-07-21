const express = require('express');
const router = express.Router();
const employeeController = require('../Controllers/employeeController');

// Routes
router.post('/users/signup', employeeController.createEmployee);
router.post('/users/login', employeeController.authenticateEmployee);
router.get('/:employeeId ', employeeController.getEmployeeById);
router.post('/addComplaint', employeeController.addComplaintToEmployee);
router.put('/users/updateProfile/:employeeId', employeeController.updateEmployeeProfile);

module.exports = router;

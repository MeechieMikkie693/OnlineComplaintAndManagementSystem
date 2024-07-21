const express = require('express');
const router = express.Router();
const complaintController = require('../Controllers/complaintControllers');

// Routes
router.post('/studentdashboard', complaintController.createComplaint);
router.get('/studentdashboard', complaintController.getAllComplaints);
router.get('/employeedashboard', complaintController.getAllEmpComplaints);
router.get('/studentdashboard/:studentId', complaintController.getComplaintById);
router.delete('/deleteComplaint/:id', complaintController.deleteComplaint);

router.put('/markAsPending/:id',complaintController.markAsPending);
router.put('/markAsDone/:id',complaintController.markAsDone);
router.put('/markAsInProgress/:id',complaintController.markAsInProgress);

router.get('/employeedashboard/:status', complaintController.getComplaintByStatus);

router.get('/studentdashboard/Done/:studentId', complaintController.getDoneComplaintsForStudent);

router.put('/studentdashboard/submitFeedback/:id', complaintController.submitFeedback);

module.exports = router;

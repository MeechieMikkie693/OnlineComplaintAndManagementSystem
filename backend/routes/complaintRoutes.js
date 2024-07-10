const express = require('express');
const router = express.Router();
const complaintControllers = require('../controllers/complaintControllers');

router.get('/', complaintControllers.getAllComplaints);
router.get('/:id', complaintControllers.findComplaintById);
router.put('/:id', complaintControllers.updateComplaint);
router.delete('/:id', complaintControllers.deleteComplaint);

module.exports = router;

const express = require('express');
const router = express.Router();
const studentControllers = require('../controllers/studentControllers');

router.get('/', studentControllers.getAllStudents);
router.post('/', studentControllers.createStudent);
router.get('/:id', studentControllers.findStudentById);
router.put('/:id', studentControllers.updateStudent);
router.delete('/:id', studentControllers.deleteStudent);
router.post('/:studentId/complaints', studentControllers.addComplaintToStudent);
router.get('/:studentId/complaints', studentControllers.getAllComplaintsForStudent);

module.exports = router;

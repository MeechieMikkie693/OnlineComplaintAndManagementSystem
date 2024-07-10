const { Student, Complaint } = require('../models/studentComplaintSchema');

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.send(students);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) {
            return res.status(404).send(`Student with id ${req.params.id} not found`);
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).send(`Student with id ${req.params.id} not found`);
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a student by ID
exports.findStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send(`Student with id ${req.params.id} not found`);
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Add a complaint to a student
exports.addComplaintToStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ studentId: req.params.studentId });
        if (!student) {
            return res.status(404).send(`Student with studentId ${req.params.studentId} not found`);
        }

        const complaint = new Complaint({
            complaintText: req.body.complaintText,
            category: req.body.category,
            studentId: student._id
        });

        await complaint.save();
        student.complaints.push(complaint);
        await student.save();

        res.status(201).send(complaint);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get all complaints for a student
exports.getAllComplaintsForStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ studentId: req.params.studentId });
        if (!student) {
            return res.status(404).send(`Student with studentId ${req.params.studentId} not found`);
        }
        res.send(student.complaints);
    } catch (error) {
        res.status(500).send(error);
    }
};

const Student = require('../Models/studentSchema');
const Complaint = require('../Models/complaintSchema');
const bcrypt = require('bcrypt');


exports.createStudent = async (req, res) => {
  try {
    const { studentId, email, password } = req.body;
    console.log("Request body:", req.body);

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newStudent = new Student({ studentId, email, password: hashedPassword });
    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error); // Log the full error stack
    res.status(500).json({ message: 'Error creating student', error: error.message });
  }
};

// Authenticate a student
exports.authenticateStudent = async (req, res) => {
  try {
    const { studentId, password } = req.body;
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Authenticated successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating student', error });
  }
};

// Get student by ID and populate complaints
exports.getStudentByStudentId = async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId }).populate('complaints');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error });
  }
};

// Add a complaint to a student
exports.addComplaintToStudent = async (req, res) => {
  try {
    const { studentId, complaintText, category } = req.body;

    // Find the student by studentId
    const student = await Student.findOne({ studentId: req.params.studentId }).populate('complaints');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create a new complaint
    const newComplaint = new Complaint({ complaintText, category, studentId });
    await newComplaint.save();

    // Associate the complaint with the student
    student.complaints.push(newComplaint._id);
    await student.save();

    res.status(201).json({ student, newComplaint });
  } catch (error) {
    res.status(500).json({ message: 'Error adding complaint to student', error });
  }
};

// Update student profile (email or password)
exports.updateStudentProfile = async (req, res) => {
  try {
    const { studentId, email, password } = req.body;
    const student = await Student.findOne({studentId:req.params.studentId});

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (email) { 
      student.email = email;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);
    }
    await student.save();
    res.status(200).json({ message: 'Profile updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

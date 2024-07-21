const Employee = require('../Models/employeeSchema');
const Complaint = require('../Models/complaintSchema');
const bcrypt = require('bcrypt');

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { employeeId, email, password } = req.body;
    console.log("Request body:", req.body);
    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newEmployee = new Employee({ employeeId, email, password: hashedPassword });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error });
  }
};

// Authenticate an employee
exports.authenticateEmployee = async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Authenticated successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating employee', error });
  }
};

// Get employee by ID and populate complaints
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('complaints');
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
};

// Add a complaint to an employee
exports.addComplaintToEmployee = async (req, res) => {
  try {
    const { employeeId, complaintId } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    employee.complaints.push(complaint._id);
    await employee.save();

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error adding complaint to employee', error });
  }
};

// Update employee profile (email or password)
exports.updateEmployeeProfile = async (req, res) => {
  try {
    const { employeeId, email, password } = req.body;
    const employee = await Employee.findOne({employeeId:req.params.employeeId});

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (email) {
      employee.email = email;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10)
      employee.password = await bcrypt.hash(password, salt);
    }

    await employee.save();

    res.status(200).json({ message: 'Profile updated successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

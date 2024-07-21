const Complaint = require('../Models/complaintSchema');
const Student = require('../Models/studentSchema');

// Create a new complaint
exports.createComplaint = async (req, res) => {
  try {
    const { complaintText, category, studentId } = req.body;

    const newComplaint = new Complaint({
      complaintText,
      category,
      studentId
    });

    const savedComplaint = await newComplaint.save();

    // // Add complaint to the student's complaint array
    // const student = await Student.findOne({email});
    // student.complaints.push(savedComplaint);
    // await student.save();

    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Error creating complaint', error });
  }
};

// Get all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
};

exports.getAllEmpComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
};

// Get complaint by ID
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.find({studentId:req.params.studentId});
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaint', error });
  }
};


// Delete a complaint
exports.deleteComplaint = async (req, res) => {
  try {
    console.log('Request params:', req.params); // Debug log

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    console.log('Complaint found:', complaint); // Debug log

    await Complaint.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ message: 'Error deleting complaint', error });
  }
};




// Route to mark a complaint as done
exports.markAsDone = async (req, res) => {
  try {
      const complaint = await Complaint.findById(req.params.id);
      if (!complaint) {
          return res.status(404).json({ message: 'Complaint not found' });
      }
      complaint.status = 'Done';
      await complaint.save();
      res.json(complaint);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Route to mark a complaint as in progress
exports.markAsInProgress = async (req, res) => {
  try {
      const complaint = await Complaint.findById(req.params.id);
      if (!complaint) {
          return res.status(404).json({ message: 'Complaint not found' });
      }
      complaint.status = 'In Progress';
      await complaint.save();
      res.json(complaint);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Route to mark a complaint as pending
exports.markAsPending = async (req, res) => {
  try {
      const complaint = await Complaint.findById(req.params.id);
      if (!complaint) {
          return res.status(404).json({ message: 'Complaint not found' });
      }
      complaint.status = 'Pending';
      await complaint.save();
      res.json(complaint);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Get complaint by Status
exports.getComplaintByStatus = async (req, res) => {
  try {
    const complaint = await Complaint.find({status:req.params.status});
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaint', error });
  }
};


//get done complaints for feedback
exports.getDoneComplaintsForStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const complaints = await Complaint.find({ studentId, status: 'Done' });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
};


exports.submitFeedback = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { feedback } = req.body;
    // Find the complaint by ID and update the feedback
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { feedback },
      { new: true } // Return the updated document
    );

    if (!updatedComplaint) {
      return res.status(404).send('Complaint not found');
    }

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
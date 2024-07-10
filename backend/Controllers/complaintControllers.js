const { Complaint } = require('../models/studentComplaintSchema');

// Get all complaints
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({});
        res.send(complaints);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a complaint by ID
exports.findComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).send(`Complaint with id ${req.params.id} not found`);
        }
        res.send(complaint);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a complaint by ID
exports.updateComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!complaint) {
            return res.status(404).send(`Complaint with id ${req.params.id} not found`);
        }
        res.send(complaint);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a complaint by ID
exports.deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndDelete(req.params.id);
        if (!complaint) {
            return res.status(404).send(`Complaint with id ${req.params.id} not found`);
        }
        res.send(complaint);
    } catch (error) {
        res.status(500).send(error);
    }
};

const mongoose = require('mongoose');


const complaintSchema = new mongoose.Schema({
    complaintText: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: () => new Date().toISOString().split('T')[0] },
    studentId: { type: String, required: true },
    status: {type:String, default:'Pending'},
    feedback: {type:String, default: 'No feedback' }  // Assuming studentId is a string identifier
}, { versionKey: false });

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;

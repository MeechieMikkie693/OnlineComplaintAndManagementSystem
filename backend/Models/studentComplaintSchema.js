const mongoose = require('mongoose');

// Define the Complaint Schema
const complaintSchema = new mongoose.Schema({
    complaintText: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' } // Reference to Student model
}, { versionKey: false });

// Create and export the Complaint model
const Complaint = mongoose.model('Complaint', complaintSchema);

// Define the Student Schema
const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }] // Array of complaint references
}, { versionKey: false });

// Create and export the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = { Student, Complaint };

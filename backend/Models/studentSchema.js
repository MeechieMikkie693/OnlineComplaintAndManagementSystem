const mongoose = require('mongoose');
// Define the Student Schema
const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }] // Array of complaint references
}, { versionKey: false });
studentSchema.index({ roll: 1 }, { sparse: true });
// Create and export the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

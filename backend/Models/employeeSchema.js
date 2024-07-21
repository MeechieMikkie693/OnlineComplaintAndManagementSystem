// models/employeeSchema.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true,},
  // complaints: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Complaint',
  // }],
}, {versionKey:false} );
employeeSchema.index({ roll: 1 }, { sparse: true });
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;


//{ timestamps: true }
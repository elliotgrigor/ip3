const mongoose = require('mongoose');
const employeeSchema = require('../schemas/employeeSchema');

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

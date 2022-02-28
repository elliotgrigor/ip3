const mongoose = require('mongoose');
const { Schema } = mongoose;

const accessSchema = require('./accessSchema');
const contactSchema = require('./contactSchema');
const dailyHoursSchema = require('./dailyHoursSchema');
const payslipSchema = require('./payslipSchema');

const employeeSchema = new Schema({
  staffNumber: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  access: accessSchema,
  password: {
    type: String,
    required: true,
  },
  contact: contactSchema,
  daysWorked: [dailyHoursSchema],
  payRate: {
    type: Number,
    required: true,
  },
  natInsNumber: { type: String, required: true },
  payslips: [payslipSchema],
});

module.exports = employeeSchema;

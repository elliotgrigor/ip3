const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  staffNumber: {
    type: Number,
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
  access: {
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    }
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    address: {
      houseNumber: { type: Number, required: true },
      street: { type: String, required: true },
      postCode: { type: String, required: true },
      city: { type: String, required: true },
    },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  daysWorked: [dailyHours],
  payRate: {},
});

export default employeeSchema;

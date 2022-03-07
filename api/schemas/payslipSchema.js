const mongoose = require('mongoose');
const { Schema } = mongoose;

const payslipSchema = new Schema({
  grossPay: {
    type: Number,
    required: true,
  },
  netPay: {
    type: Number,
    required: true,
  },
  natInsContrib: {
    type: Number,
  },
  incomeTax: {
    type: Number,
  },
  taxCode: {
    type: String,
    required: true,
  },
  pensionContrib: {
    type: Number,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  extra: { _id: false },
});

module.exports = payslipSchema;

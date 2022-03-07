const mongoose = require('mongoose');
const { Schema } = mongoose;

const accessSchema = new Schema({
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
}, { _id: false });

module.exports = accessSchema;

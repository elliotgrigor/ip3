const mongoose = require('mongoose');
const { Schema } = mongoose;

const dailyHoursSchema = new Schema({
  forDate: { type: Date, required: true },
  startTime: { type: Date, required: true },
  finishTime: { type: Date, required: true },
  dailyHours: { type: Number, required: true },
});

export default dailyHoursSchema;

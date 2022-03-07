const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  address: {
    houseNumber: { type: Number, required: true },
    street: { type: String, required: true },
    postCode: { type: String, required: true },
    city: { type: String, required: true },
  },
  phone: { type: String, required: true },
  email: { type: String, required: true },
}, { _id: false });

module.exports = contactSchema;

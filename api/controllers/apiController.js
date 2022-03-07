const mongoose = require('mongoose');
const employeeModel = require('../models/employeeModel');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DOMAIN}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
  );
}

exports.getAllEmployees = (req, res) => {
  const employees = employeeModel.find({}, (err, employees) => {
    if (err) return console.log(err);
    res.json({ employees });
  });
}

exports.getEmployeesByLevel = (req, res) => {
  const employees = employeeModel.find(
    { 'access.level': req.params.accessLevel },
    (err, employees) => {
      if (err) return console.log(err);
      res.json({ employees });
    }
  );
}

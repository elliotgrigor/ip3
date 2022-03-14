const db = require('./dbController.js');
const {
  EmployeeModel,
  AccessModel,
  AddressModel,
  ContactModel,
  DailyHoursModel,
  PayslipModel,
} = require('../models/EmployeeModel');

exports.getAllEmployees = (req, res) => {
  db.employees.find({}, (err, docs) => {
    if (err) return console.log(err);
    res.json({ employees: docs });
  });
}

exports.getEmployeesByLevel = (req, res) => {
  db.employees.find(
    { 'access.level': req.params.accessLevel },
    (err, docs) => {
      if (err) return console.log(err);
      res.json({ employees: docs });
    }
  );
}

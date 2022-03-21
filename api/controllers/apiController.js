const db = require('./dbController.js');

exports.getAllEmployees = (req, res) => {
  db.employees.find({}, (err, docs) => {
    if (err) return console.log(err);
    res.json({ employees: docs });
  });
}

exports.getEmployeeById = (req, res) => {
  db.employees.findOne(
    { staffNumber: req.params.staffNumber },
    (err, doc) => {
      if (err) return console.log(err);
      res.json({ employee: doc });
    }
  );
}

exports.getEmployeesByLevel = (req, res) => {
  db.employees.find(
    { 'access.level': parseInt(req.params.accessLevel) },
    (err, docs) => {
      if (err) return console.log(err);
      res.json({ employees: docs });
    }
  );
}

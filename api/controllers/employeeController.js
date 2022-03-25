const { employees } = require('./dbController.js');

exports.getAll = (req, res) => {
  employees.find({}, (err, docs) => {
    if (err) return console.log(err);
    res.json({ employees: docs });
  });
}

exports.getById = (req, res) => {
  employees.findOne(
    { staffNumber: req.params.staffNumber },
    (err, doc) => {
      if (err) return console.log(err);
      res.json({ employee: doc });
    }
  );
}

exports.getByLevel = (req, res) => {
  const accessLevel = req.params.accessLevel;

  if (accessLevel === '1-2') {
    return employees.find(
      { 'access.level': { $in: [1, 2] } },
      (err, docs) => {
        if (err) return console.log(err);
        res.json({ employees: docs });
      }
    );
  }

  return employees.find(
    { 'access.level': parseInt(accessLevel) },
    (err, docs) => {
      if (err) return console.log(err);
      res.json({ employees: docs });
    }
  );
}

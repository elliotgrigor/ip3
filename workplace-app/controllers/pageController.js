const { render } = require('pug');

const db = require('../../api/controllers/dbController');
db.load();

exports.home = (req, res) => {
  const loggedInUser = {
    accessLevel: req.user.access.level,
    name: req.user.firstName,
  };
  res.render('index', { loggedInUser });
}

exports.profile = (req, res) => {
  const loggedInUser = {
    accessLevel: req.user.access.level,
    name: req.user.firstName,
  };
  res.render('profile', { loggedInUser });
}

exports.editProfile = (req, res) => {
  // if GET, if POST
}

exports.timeClock = (req, res) => {
  const loggedInUser = {
    accessLevel: req.user.access.level,
    name: req.user.firstName,
  };
  res.render('timeClock', { loggedInUser });
}

exports.payslips = (req, res) => {
  let loggedInUser = {
    accessLevel: req.user.access.level,
    name: req.user.firstName,
  };

  db.employees.findOne(
    { staffNumber: req.user.staffNumber },
    (err, doc) => {
      if (err) return console.log(err);
      loggedInUser = { ...loggedInUser, payslips: doc.payslips };

      res.render('payslips', { loggedInUser });
    }
  );
}

exports.viewRota = (req, res) => {
  res.render('rota', {});
}

exports.addShift = (req, res) => {
  res.render('addShift', {});
}


exports.listEmployees = (req, res) => {
  res.render('employees', {});
}

exports.viewEmployee = (req, res) => {
  res.render('viewEmployee', {});
}

exports.addEmployee = (req, res) => {
  res.render('addEmployee', {});
}

exports.editEmployee = (req, res) => {
  res.render('editEmployeeProfile', {});
}

exports.editEmployeeProfile = (req, res) => {
  res.render('editEmployeeDetails', {});
}

exports.editProfile = (req, res) => {
  res.render('editMyDetails', {});
}

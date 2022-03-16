const { render } = require('pug');

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
  const loggedInUser = {
    accessLevel: req.user.access.level,
    name: req.user.firstName,
  };
  res.render('payslips', { loggedInUser });
}

exports.viewRota = (req, res) => {
  res.render('Rota', {});
}

exports.addShift = (req, res) => {
  res.render('addShift', {});
}


exports.employees = (req, res) => {
  res.render('employees', {});
}

exports.viewEmployee = (req, res) => {
  res.render('viewEmployee', {});
}

exports.addEmployee = (req, res) => {
  res.render('addEmployee', {});
}

exports.editEmployeeDetails = (req, res) => {
  res.render('editEmployeeDetails', {});
}

exports.editMyDetails = (req, res) => {
  res.render('editMyDetails', {});
}
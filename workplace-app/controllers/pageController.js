const { render } = require('pug');

exports.home = (req, res) => {
  const loggedInUser = {
    accessLevel: req.user.access.level,
    name: req.user.firstName,
  };
  res.render('index', { loggedInUser });
}

exports.payslips = (req, res) => {
  res.render('payslips', {});
}

exports.viewRota = (req, res) => {
  res.render('Rota', {});
}

exports.addShift = (req, res) => {
  res.render('addShift', {});
}

exports.myDetails = (req, res) => {
  const loggedInUser = {
    accessLevel: req.user.access.level,
    name: req.user.firstName,
  };
  res.render('myDetails', { loggedInUser });
}

exports.punchIn = (req, res) => {
  res.render('punchIn', {});
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
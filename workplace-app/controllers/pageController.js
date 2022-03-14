const { render } = require('pug');

exports.home = (req, res) => {
  if (req.isAuthenticated() && req.user.access.level === 3) {
    const loggedInUser = {firstName: "Devlin", employeeType: "Manager"};
    return res.render('index', {loggedInUser});
  }
  res.redirect('/login');
}

exports.payslips = (req, res) => {
  res.render('payslips', {});
}

exports.rota = (req, res) => {
  res.render('rota', {});
}

exports.myDetails = (req, res) => {
  res.render('myDetails', {});
}

exports.punchIn = (req, res) => {
  res.render('punchIn', {});
}

exports.employee = (req, res) => {
  res.render('employee', {});
}

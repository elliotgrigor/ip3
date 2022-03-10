const { render } = require('pug');

exports.home = (req, res) => {
  if (req.isAuthenticated()) {
    const loggedInUser = {firstName: "Devlin", employeeType: "Manager"};
    return res.render('index', {data: loggedInUser});
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

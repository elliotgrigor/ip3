
exports.home = (req, res) => {
  const loggedInUser = {firstName: "Devlin", employeeType: "Manager"};
  res.render('index', {data: loggedInUser});
}

exports.login = (req, res) => {
  res.render('login', {});
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
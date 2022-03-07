
exports.home = (req, res) => {
  const loggedInUser = {firstName: "Devlin", employeeType: "Manager"};
  res.render('index', {data: loggedInUser});
}

exports.login = (req, res) => {
  res.render('login', {});
}

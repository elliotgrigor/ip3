const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { render } = require('pug');

exports.home = (req, res) => {
  const loggedInUser = {firstName: "Devlin", employeeType: "Manager"};
  res.render('index', {data: loggedInUser});
}

exports.login = (req, res) => {
  if (req.method === 'GET') {
    return res.render('login', {});
  }
  else if (req.method === 'POST') {
    const id = req.body.userID;
    const password = req.body.password;
    
    bcrypt.compare(password, hash, (err, result) => {
      if (result == true) {
        //Make authenication token
      } else {
        res.redirect('/login');
      }
    });
  }
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
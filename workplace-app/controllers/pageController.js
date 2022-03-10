const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { render } = require('pug');

const db = require('../../api/controllers/dbController');
db.load();

exports.home = (req, res) => {
  console.log(req.session);
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

    db.employees.findOne({ staffNumber: id }, (err, doc) => {
      if (err) {
        // log error
        // redirect with flash message -- db query failed
      }

      bcrypt.compare(password, doc.password, (err, result) => {
        if (result) {
          return console.log('Passwords match');
        } else {
          // flash message -- username/password combination invalid
          return res.redirect('/login');
        }
      });
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

exports.authCheck = (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }
}

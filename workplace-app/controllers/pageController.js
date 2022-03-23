const fetch = require('node-fetch');

const db = require('../../api/controllers/dbController');

exports.home = (req, res) => {
  res.render('index', { loggedInUser: req.user });
}

exports.profile = (req, res) => {
  res.render('profile', { loggedInUser: req.user });
}

exports.editProfile = (req, res) => {
  if (req.method == 'GET') {
    res.render('editProfile', { loggedInUser: req.user });
  }
}

exports.timeClock = (req, res) => {
  res.render('timeClock', { loggedInUser: req.user });
}

exports.payslips = (req, res) => {
  res.render('payslips', { loggedInUser: req.user });
}

exports.viewRota = (req, res) => {
  res.render('rota', { loggedInUser: req.user });
}

exports.addShift = (req, res) => {
  res.render('addShift', {});
}

exports.listEmployees = (req, res) => {
  if (req.user.access.level === 3) {
    fetch(`http://localhost:3001/api/v1/get/employee/level/1-2`)
      .then(res => res.json())
      .then(json => {
        res.render('employeeList', {
          loggedInUser: req.user,
          employees: json.employees,
        });
      })
      .catch(err => console.log(err));
  }
}

exports.viewEmployee = (req, res) => {
  db.employees.findOne(
    { staffNumber: req.params.staffNumber },
    { 'access.level': 1 },
    (err, doc) => {
      if (doc.access.level !== req.user.access.level) {
        fetch(`http://localhost:3001/api/v1/get/employee/id/${req.params.staffNumber}`)
          .then(res => res.json())
          .then(json => {
            res.render('employeeProfile', {
              loggedInUser: req.user,
              passedInUser: json.employee,
            });
          })
          .catch(err => console.log(err));
      } else {
        res.redirect('/employees');
      }
    }
  );
}

exports.addEmployee = (req, res) => {
  res.render('addEmployee', {});
}

exports.editEmployee = (req, res) => {
  if(req.method == 'GET') {
    fetch(`http://localhost:3001/api/v1/get/employee/id/${req.params.staffNumber}`)
      .then(res => res.json())
      .then(json => {
        res.render('editEmployeeProfile', {
          loggedInUser: req.user,
          passedInUser: json.employee,
        });
      })
      .catch(err => console.log(err));
  }
}

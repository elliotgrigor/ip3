const fetch = require('node-fetch');

const { rotas } = require('./dbController');

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
  // fetch(`http://localhost:3001/api/v1/get/rota/week/${req.params.weekStart}`)
  fetch(`http://localhost:3001/api/v1/get/rota/week/2022-04-04`)
    .then(res => res.json())
    .then(json => {
      res.render('rota', {
        rota: json.rota,
        loggedInUser: req.user,
      });
    })
    .catch(err => console.log(err));
}

exports.addShift = (req, res) => {
  res.render('addShift', {});
}

exports.editShift = (req, res) => {
  if (req.method === 'GET') {
    fetch(`http://localhost:3001/api/v1/get/rota/week/${req.params.weekStart}`)
      .then(res => res.json())
      .then(json => {
        json.rota.staffSchedule.forEach((employee, idx) => {
          if (employee.staffId === req.params.staffId) {
            res.render('editShift', {
              staffMember: {
                id: req.params.staffId,
                name: employee.name,
              },
              shift: employee[req.params.day],
              shiftInfo: {
                weekStart: req.params.weekStart,
                day: req.params.day,
                index: idx,
              },
              loggedInUser: req.user,
            });
          }
        });
      })
      .catch(err => console.log(err));
  }
  else if (req.method === 'POST') {
    const [weekStart, day, staffId] = [
      req.params.weekStart,
      req.params.day,
      req.params.staffId
    ];
    const newShift = [req.body.startTime, req.body.endTime];
    const staffShift = `staffSchedule.${req.body.index}.${day}`;

    rotas.update(
      { weekStart },
      { $set: { [staffShift]: newShift } },
      {},
      (err, updates, doc) => {
        if (err) return console.log(err);
        console.log('Updated:', doc);
        res.redirect('/rota');
      }
    );
  }
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

const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

const { employees, rotas } = require('./dbController');

exports.home = (req, res) => {
  res.render('index', { loggedInUser: req.user });
}

exports.profile = (req, res) => {
  res.render('profile', { loggedInUser: req.user });
}

exports.editProfile = (req, res) => {
  if (req.method === 'GET') {
    res.render('editProfile', { loggedInUser: req.user });
  }
  else if (req.method === 'POST') {
    employees.update(
      { staffNumber: req.user.staffNumber },
      { $set: {
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'gender': req.body.gender,
        'contact.address.houseNumber': req.body.houseNo,
        'contact.address.street': req.body.street,
        'contact.address.postCode': req.body.postCode,
        'contact.address.city': req.body.city,
        'contact.phone': req.body.phone,
        'contact.email': req.body.email,
      } },
      { upsert: true },
      (err, numReplaced) => {
        if (err) return console.log(err);
        console.log(numReplaced);
        res.redirect('/logout');
      }
    );
  }
}

exports.timeClock = (req, res) => {
  if (req.method === 'GET') {
    const staffNumber = req.user.staffNumber;
    let newShift;

    employees.findOne(
      { staffNumber },
      { 'daysWorked': 1 },
      (err, doc) => {
        if (err) return console.log(err);
        
        const lastElement = doc.daysWorked[doc.daysWorked.length - 1];
        
        if (doc.daysWorked.length === 0) {
          newShift = true;
        } else if (lastElement.finishTime) {
          newShift = true;
        }

        res.render('timeClock', {
          loggedInUser: req.user,
          newShift,
        });
      }
    );
  }
  else if (req.method === 'POST') {
    const punchType = req.body.punchType;
    const staffNumber = req.user.staffNumber;

    if (punchType === 'in') {
      employees.update(
        { staffNumber },
        { $push: { daysWorked: {
          forDate: new Date().toISOString().split('T')[0],
          startTime: new Date().toISOString().split('T')[1],
          finishTime: null,
          dailyHours: null,
        } } },
        {},
        (err, changes) => {
          if (err) return console.log(err);
          console.log('Added to array:', changes);
          res.redirect('/timeClock');
        }
      );
    }
    else if (punchType === 'out') {
      let lastIndex;
      let startTime;

      employees.findOne(
        { staffNumber },
        { 'daysWorked': 1 },
        (err, doc) => {
          if (err) return console.log(err);
          lastIndex = doc.daysWorked.length - 1;
          startTime = doc.daysWorked[lastIndex].startTime;

          const finishTimeQ = `daysWorked.${lastIndex}.finishTime`;
          const dailyHoursQ = `daysWorked.${lastIndex}.dailyHours`;
          const finishTime = new Date().toISOString().split('T')[1];

          const currentDate = new Date().toISOString().split('T')[0];
          const timeBegin = new Date(`${currentDate}T` + startTime);
          const timeEnd = new Date(`${currentDate}T` + finishTime);
          const diff = timeEnd - timeBegin;
          const delta = diff / (1000 * 60 * 60);

          employees.update(
            { staffNumber },
            { $set: {
              [finishTimeQ]: finishTime,
              [dailyHoursQ]: delta.toFixed(2) }
            },
            {},
            (err, changes) => {
              if (err) return console.log(err);
              console.log('Updated:', changes);
              res.redirect('/');
            }
          );
        }
      );
    }
  }
}

exports.payslips = (req, res) => {
  res.render('payslips', { loggedInUser: req.user });
}

exports.viewRota = (req, res) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  let nearestMon = currentDate - ((currentDay - 1) * 24 * 60 * 60 * 1000);
  // ^^^ THIS IS BORKED FOR SUNDAYS ^^^
  nearestMon = new Date(nearestMon).toISOString().split('T')[0];

  // fetch(`http://localhost:3001/api/v1/get/rota/week/2022-04-04`)
  fetch(`http://localhost:3001/api/v1/get/rota/week/${nearestMon}`)
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
      (err, changed) => {
        if (err) return console.log(err);
        console.log('Updated:', changed);
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
  } else {
    res.redirect('/');
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
  if (req.method === 'GET') {
    res.render('addEmployee', {
      loggedInUser: req.user,
    });
  }
  else if (req.method === 'POST') {
    let payRate = null;

    switch (req.body.employeeType) {
      case ('1'):
        payRate = 8.95;
        break;
      case ('2'):
        payRate = 10.15;
        break;
      case ('3'):
        payRate = 12.80;
        break;
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash('nonce', salt, (err, hash) => {
        const newEmployee = {
          staffNumber: req.body.staffNo,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dateOfBirth: req.body.birthDate,
          gender: req.body.gender,
          access: { level: parseInt(req.body.employeeType) },
          password: hash,
          contact: {
            address: {
              houseNumber: req.body.houseNo,
              street: req.body.street,
              postCode: req.body.postCode,
              city: req.body.city,
            },
            phone: req.body.phone,
            email: req.body.email,
          },
          daysWorked: [],
          payRate,
          natInsNumber: req.body.ni,
          payslips: [],
        };

        employees.insert(newEmployee, (err, doc) => {
          if (err) return console.log(err);
          console.log('Inserted:', doc);
          res.redirect('/employees');
        });
      });
    });

  }
}

exports.editEmployee = (req, res) => {
  if (req.user.access.level < 3) {
    return res.redirect('/');
  }

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
  else if(req.method === 'POST') {
    employees.update(
      { staffNumber: req.params.staffNumber },
      { $set: {
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'gender': req.body.gender,
        'access.level': parseInt(req.body.employeeType),
        'contact.address.houseNumber': req.body.houseNo,
        'contact.address.street': req.body.street,
        'contact.address.postCode': req.body.postCode,
        'contact.address.city': req.body.city,
        'contact.phone': req.body.phone,
        'contact.email': req.body.email,
      } },
      { upsert: true },
      (err, numReplaced) => {
        if (err) return console.log(err);
        console.log(numReplaced);
        res.redirect('/employees');
      }
    );
  }
}

exports.removeEmployee = (req, res) => {
  employees.remove(
    { staffNumber: req.params.staffNumber },
    {},
    (err, numDeleted) => {
      if (err) return console.log(err);
      console.log('Deleted:', numDeleted);
      res.redirect('/employees');
    }
  );
}

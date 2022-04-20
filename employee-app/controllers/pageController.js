const fetch = require('node-fetch');

exports.home = (req, res) => {
  res.render('index', {});
};

exports.profile = (req, res) => {
  res.render('staffProfile', {user: req.user});
}

exports.editProfile = (req, res) => {
  if(req.method === 'GET') {
    res.render('editProfile', {user: req.user});
  }
  else if(req.method === 'POST') {
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

exports.payslips = (req, res) => {
  res.render('viewPayslip', {user: req.user});
}

exports.rotaList = (req, res) => {
  //
}

exports.viewRota = (req, res) => {
  fetch(`http://localhost:3001/api/v1/get/rota/week/${req.params.weekStart}`)
    .then(res => res.json())
    .then(json => {
      json.rota.staffSchedule.forEach(schedule => {
        if (schedule.staffId === req.user.staffNumber) {
          const shifts = schedule;
          res.render('archiveRota', { shifts });
        }
      });
    })
    .catch(err => console.log(err));
}

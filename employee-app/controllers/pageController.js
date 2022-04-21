const fs = require('fs');
const fetch = require('node-fetch');
const PDFDocument = require('pdfkit-table');

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

exports.downloadRota = (req, res) => {
  fetch(`http://localhost:3001/api/v1/get/rota/week/${req.params.weekStart}`)
    .then(res => res.json())
    .then(json => {
      json.rota.staffSchedule.forEach(schedule => {
        if (schedule.staffId === req.user.staffNumber) {
          let rotaFile = `./rotas/rota_${req.params.weekStart}_${schedule.staffId}.pdf`;
          let doc = new PDFDocument({
            size: 'A5',
            layout: 'landscape',
            margin: 40,
          });

          const table = {
            title: `Rota for week starting ${req.params.weekStart} for ${schedule.name}`,
            headers: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
            rows: [
              [schedule.mon ? `${schedule.mon[0]} - ${schedule.mon[1]}` : 'n/a',
               schedule.tue ? `${schedule.tue[0]} - ${schedule.tue[1]}` : 'n/a',
               schedule.wed ? `${schedule.wed[0]} - ${schedule.wed[1]}` : 'n/a',
               schedule.thu ? `${schedule.thu[0]} - ${schedule.thu[1]}` : 'n/a',
               schedule.fri ? `${schedule.fri[0]} - ${schedule.fri[1]}` : 'n/a',
               schedule.sat ? `${schedule.sat[0]} - ${schedule.sat[1]}` : 'n/a',
               schedule.sun ? `${schedule.sun[0]} - ${schedule.sun[1]}` : 'n/a'],
            ],
          };

          doc.pipe(fs.createWriteStream(`${rotaFile}`));
          doc.table(table);
          doc.end();

          setTimeout(() => {
            res.download(rotaFile);
          }, 300);

          setTimeout(() => {
            // delete generated file after 1 min
            fs.unlink(rotaFile, err => console.log(err));
          }, 10_000);
        }
      });
    })
    .catch(err => console.log(err));
}

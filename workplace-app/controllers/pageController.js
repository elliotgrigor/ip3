const { render } = require('pug');
const fetch = require('node-fetch');

const db = require('../../api/controllers/dbController');
db.load();

exports.home = (req, res) => {
  const loggedInUser = {
    accessLevel: req.user.access.level,
    name: req.user.firstName,
  };
  res.render('index', { loggedInUser });
}

exports.profile = (req, res) => {
  let loggedInUser = {
    accessLevel: req.user.access.level,
    firstName: req.user.firstName,
  };

  //Works except error with showing the date
  //Think this is just some minor problem with the date format and the input type="date"
  db.employees.findOne(
    { staffNumber: req.user.staffNumber },
    (err, doc) => {
      if(err) console.log(err);

      loggedInUser = {
        ...loggedInUser,
        lastName: doc.lastName,
        dateOfBirth: doc.dateOfBirth,
        gender: doc.gender,
        phoneNo: doc.contact.phone,
        email: doc.contact.email,
        houseNo: doc.contact.address.houseNumber,
        street: doc.contact.address.street,
        postcode: doc.contact.address.postCode,
        city: doc.contact.address.city
      }

      res.render('profile', { loggedInUser });
    }
  );
  
}

exports.editProfile = (req, res) => {
  // if GET, if POST
  if(req.method == 'GET') {

    let loggedInUser = {
      accessLevel: req.user.access.level,
      firstName: req.user.firstName,
    };

    db.employees.findOne(
      { staffNumber: req.user.staffNumber },
      (err, doc) => {
        if(err) console.log(err);

        loggedInUser = {
          ...loggedInUser,
          lastName: doc.lastName,
          dateOfBirth: doc.dateOfBirth,
          gender: doc.gender,
          phoneNo: doc.contact.phone,
          email: doc.contact.email,
          houseNo: doc.contact.address.houseNumber,
          street: doc.contact.address.street,
          postcode: doc.contact.address.postCode,
          city: doc.contact.address.city
        }
        
        res.render('editProfile', { loggedInUser });
      }
    );
  }
}

exports.timeClock = (req, res) => {
  const loggedInUser = {
    accessLevel: req.user.access.level,
    name: req.user.firstName,
  };
  res.render('timeClock', { loggedInUser });
}

exports.payslips = (req, res) => {
  let loggedInUser = {
    accessLevel: req.user.access.level,
    name: req.user.firstName,
  };

  db.employees.findOne(
    { staffNumber: req.user.staffNumber },
    (err, doc) => {
      if (err) return console.log(err);
      loggedInUser = { ...loggedInUser, payslips: doc.payslips };

      res.render('payslips', { loggedInUser });
    }
  );
}

exports.viewRota = (req, res) => {
  res.render('rota', {});
}

exports.addShift = (req, res) => {
  res.render('addShift', {});
}


exports.listEmployees = (req, res) => {
  let loggedInUser = {
    accessLevel: req.user.access.level,
    name: req.user.firstName,
  };

  db.employees.find(
    {}, 
    (err, doc) => {
      if(err) return console.log(err);

      let employees = doc;

      res.render('employeeList', { loggedInUser, employees });
    }
  );
  
  
}

exports.viewEmployee = (req, res) => {
  let loggedInUser = {
    accessLevel: req.user.access.level,
    name: req.user.firstName,
  };

  // fetch(`http://localhost:3001/api/v1/get/employee/id/${req.user.staffNumber}`)
  //   .then(res => res.json())
  //   .then(json => {
  //       res.render('profile', { loggedInUser: json.employee });
  //   })
  //   .catch(err => console.log(err));

  db.employees.findOne(
    { staffNumber: req.params.staffNumber },
    (err, doc) => {
      if(err) console.log(err);

      let passedInUser = {
        firstName: doc.firstName,
        lastName: doc.lastName,
        dateOfBirth: doc.dateOfBirth,
        gender: doc.gender,
        phoneNo: doc.contact.phone,
        email: doc.contact.email,
        houseNo: doc.contact.address.houseNumber,
        street: doc.contact.address.street,
        postcode: doc.contact.address.postCode,
        city: doc.contact.address.city,
        accessLevel: doc.access.level,
        staffNumber: doc.staffNumber
      }
      
      res.render('employeeProfile', { loggedInUser, passedInUser });
    }
  );
}

exports.addEmployee = (req, res) => {
  res.render('addEmployee', {});
}

exports.editEmployee = (req, res) => {
  

  if(req.method == 'GET') {

    let loggedInUser = {
      accessLevel: req.user.access.level,
      name: req.user.firstName,
    };

    db.employees.findOne(
      { staffNumber: req.params.staffNumber },
      (err, doc) => {
        if(err) console.log(err);
  
        let passedInUser = {
          firstName: doc.firstName,
          lastName: doc.lastName,
          dateOfBirth: doc.dateOfBirth,
          gender: doc.gender,
          phoneNo: doc.contact.phone,
          email: doc.contact.email,
          houseNo: doc.contact.address.houseNumber,
          street: doc.contact.address.street,
          postcode: doc.contact.address.postCode,
          city: doc.contact.address.city,
          accessLevel: doc.access.level
        }
        
        res.render('editEmployeeProfile', { loggedInUser, passedInUser });
      }
    );
  }

  //res.render('editEmployeeProfile', {});
}

exports.editEmployeeProfile = (req, res) => {
  res.render('editEmployeeDetails', {});
}

//exports.editProfile = (req, res) => {
//  res.render('editMyDetails', {});
//}

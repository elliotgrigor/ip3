const bcrypt = require('bcrypt');

const db = require('./controllers/dbController');
db.load();

const {
  EmployeeModel, AccessModel, AddressModel,
  ContactModel, DailyHoursModel,PayslipModel,
} = require('./models/EmployeeModel');

const { employees } = require('./controllers/dbController.js');

const johnAccess = new AccessModel(level = 2);

const johnAddress = new AddressModel(
  houseNumber = 123,
  street      = 'Sesame Street',
  postCode    = 'AB1 2CD',
  city        = 'New York City',
);

const johnContact = new ContactModel(
  address = johnAddress,
  phone = '+441234567890',
  email = 'john@email.com',
);

const johnDailyHours = new DailyHoursModel(
  forDate    = new Date(),
  startTime  = new Date(),
  finishTime = new Date(),
  dailyHours = new Date(),
);

const johnPayslip = new PayslipModel(
  grossPay       = 1200.00,
  netPay         = 1000.00,
  natInsContrib  = 50.00,
  incomeTax      = 50.00,
  taxCode        = 'S1250',
  pensionContrib = 100.00,
  issueDate      = new Date(),
);

const john = new EmployeeModel(
  staffNumber  = 'A001',
  firstName    = 'John',
  lastName     = 'Smith',
  dateOfBirth  = new Date(),
  gender       = 'M',
  profilePic   = '/img/image.png',
  access       = johnAccess,
  password     = 'aSecurePassword',
  contact      = johnContact,
  daysWorked   = [johnDailyHours],
  payRate      = 8.95,
  natInsNumber = 'AB123456C',
  payslips     = [johnPayslip],
);

employees.insert(john, (err, newDoc) => {
  if (err) return console.log(err);
  console.log(newDoc);
});

const bcrypt = require('bcrypt');

const db = require('./controllers/dbController');

const {
  EmployeeModel, AccessModel, AddressModel,
  ContactModel, DailyHoursModel,PayslipModel,
} = require('./models/EmployeeModel');

const { employees, rotas } = require('./controllers/dbController.js');

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
  dailyHours = 8.03,
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

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('nonce', salt, (err, hash) => {
    const john = new EmployeeModel(
      staffNumber  = 'A001',
      firstName    = 'John',
      lastName     = 'Smith',
      dateOfBirth  = new Date(),
      gender       = 'M',
      profilePic   = '/img/image.png',
      access       = johnAccess,
      password     = hash,
      contact      = johnContact,
      daysWorked   = [johnDailyHours],
      payRate      = 8.95,
      natInsNumber = 'AB123456C',
      payslips     = [johnPayslip],
    );

    const jane = new EmployeeModel(
      staffNumber  = 'A002',
      firstName    = 'Jane',
      lastName     = 'Frankenstein',
      dateOfBirth  = new Date(),
      gender       = 'F',
      profilePic   = '/img/image.png',
      access       = { level: 3 },
      password     = hash,
      contact      = johnContact,
      daysWorked   = [johnDailyHours],
      payRate      = 12.80,
      natInsNumber = 'AB123456C',
      payslips     = [johnPayslip],
    );

    const joe = new EmployeeModel(
      staffNumber  = 'A003',
      firstName    = 'Joe',
      lastName     = 'Garcia',
      dateOfBirth  = new Date(),
      gender       = 'M',
      profilePic   = '/img/image.png',
      access       = { level: 1 },
      password     = hash,
      contact      = johnContact,
      daysWorked   = [johnDailyHours],
      payRate      = 12.80,
      natInsNumber = 'AB123456C',
      payslips     = [johnPayslip],
    );

    employees.insert([john, jane, joe], (err, newDocs) => {
      if (err) return console.log(err);
      console.log(newDocs);
    });
  });
});

rotas.insert([
  { weekStart: new Date('2022-04-04').toISOString().split('T')[0],
    staffSchedule: [
    {
      staffId: 'A001',
      name: 'John',
      mon: ['1400', '2100'],
      tue: null,
      wed: ['0900', '1500'],
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: ['1620', '2210'],
    },
    {
      staffId: 'A002',
      name: 'Jane',
      mon: ['1400', '2100'],
      tue: null,
      wed: ['0900', '1500'],
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: ['1620', '2210'],
    },
    {
      staffId: 'A003',
      name: 'Joe',
      mon: ['1400', '2100'],
      tue: null,
      wed: ['0900', '1500'],
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: ['1620', '2210'],
    },
  ] },
  { weekStart: new Date('2022-04-11').toISOString().split('T')[0],
    staffSchedule: [
    {
      staffId: 'A001',
      name: 'John',
      mon: ['1400', '2100'],
      tue: null,
      wed: ['0900', '1500'],
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: ['1620', '2210'],
    },
    {
      staffId: 'A002',
      name: 'Jane',
      mon: ['1400', '2100'],
      tue: null,
      wed: ['0900', '1500'],
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: ['1620', '2210'],
    },
    {
      staffId: 'A003',
      name: 'Joe',
      mon: ['1400', '2100'],
      tue: null,
      wed: ['0900', '1500'],
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: ['1620', '2210'],
    },
  ] },
  { weekStart: new Date('2022-04-18').toISOString().split('T')[0],
    staffSchedule: [
    {
      staffId: 'A001',
      name: 'John',
      mon: ['1400', '2100'],
      tue: null,
      wed: ['0900', '1500'],
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: ['1620', '2210'],
    },
    {
      staffId: 'A002',
      name: 'Jane',
      mon: ['1400', '2100'],
      tue: null,
      wed: ['0900', '1500'],
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: ['1620', '2210'],
    },
    {
      staffId: 'A003',
      name: 'Joe',
      mon: ['1400', '2100'],
      tue: null,
      wed: ['0900', '1500'],
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: ['1620', '2210'],
    },
  ] },
], (err, newDocs) => {
  if (err) console.log(err);
  console.log('Inserted:', newDocs);
});

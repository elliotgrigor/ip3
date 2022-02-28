const Employee = require('./models/employeeModel');

const john = new Employee({
  staffNumber: 'A001',
  firstName: 'John',
  lastName: 'Smith',
  DOB: new Date(1997, 2, 23),
  gender: 'M',
  profilePic: 'http://something.net',
  access: {
    level: 2,
  },
  password: 'very secure password',
  contact: {
    address: {
      houseNumber: 20,
      street: 'Sesame Street',
      postCode: 'AB1 2CD',
      city: 'New York City',
    },
    phone: '+441234567890',
    email: 'john.smith@email.com',
  },
  daysWorked: [
    {
      forDate: new Date().toDateString(),
      startTime: new Date(2022, 1, 28, 8, 47, 0, 0),
      finishTime: new Date(2022, 1, 28, 17, 2, 0, 0),
      dailyHours: 8,
    },
  ],
  payRate: 100.81,
  natInsNumber: 'AA123456B',
  payslips: [
    {
      grossPay: 1200.00,
      netPay: 1050.00,
      natInsContrib: 50.00,
      incomeTax: 50.00,
      taxCode: 'S1250',
      pensionContrib: 50.00,
      issueDate: new Date(),
    },
  ],
});

john.save();
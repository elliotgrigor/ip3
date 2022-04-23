require('dotenv').config();

const bcrypt = require('bcrypt');

const { employees, rotas } = require('./controllers/dbController');

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('nonce', salt, (err, hash) => {
    const john = {
      staffNumber: 'A001',
      firstName: 'John',
      lastName: 'Smith',
      dateOfBirth: new Date('1989-01-27').toISOString().split('T')[0],
      gender: 'M',
      access: { level: 3 },
      password: hash,
      contact: {
        address: {
          houseNumber: '123',
          street: 'Sesame Street',
          postCode: 'AB1 2CD',
          city: 'New York City',
        },
        phone: '+441234567890',
        email: 'john@email.com',
      },
      daysWorked: [],
      payRate: 8.95,
      natInsNumber: 'AB123456C',
      payslips: [],
    };

    const jane = {
      staffNumber: 'A002',
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: new Date('2001-09-03').toISOString().split('T')[0],
      gender: 'F',
      access: { level: 2 },
      password: hash,
      contact: {
        address: {
          houseNumber: '123',
          street: 'Sesame Street',
          postCode: 'AB1 2CD',
          city: 'New York City',
        },
        phone: '+441234567890',
        email: 'jane@email.com',
      },
      daysWorked: [],
      payRate: 12.80,
      natInsNumber: 'AB123456C',
      payslips: [],
    };

    const joe = {
      staffNumber: 'A003',
      firstName: 'Joe',
      lastName: 'Bloggs',
      dateOfBirth: new Date('1992-12-08').toISOString().split('T')[0],
      gender: 'M',
      access: { level: 1 },
      password: hash,
      contact: {
        address: {
          houseNumber: '123',
          street: 'Sesame Street',
          postCode: 'AB1 2CD',
          city: 'New York City',
        },
        phone: '+441234567890',
        email: 'joe@email.com',
      },
      daysWorked: [],
      payRate: 10.20,
      natInsNumber: 'AB123456C',
      payslips: [],
    };

    employees.insert([john, jane, joe], (err, newDocs) => {
      if (err) return console.log(err);
      console.log('Inserted:', newDocs);
    });
  });
});

rotas.insert([
  { weekStart: new Date('2022-04-18').toISOString().split('T')[0],
    staffSchedule: [
    {
      staffId: 'A001',
      name: 'John Smith',
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
      name: 'Jane Doe',
      mon: ['1400', '2100'],
      tue: ['0900', '1500'],
      wed: ['0900', '1500'],
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: null,
    },
    {
      staffId: 'A003',
      name: 'Joe Bloggs',
      mon: ['1400', '2100'],
      tue: ['0900', '1500'],
      wed: null,
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: ['1620', '2210'],
    },
  ] },
  { weekStart: new Date('2022-04-25').toISOString().split('T')[0],
    staffSchedule: [
    {
      staffId: 'A001',
      name: 'John Smith',
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
      name: 'Jane Doe',
      mon: ['1400', '2100'],
      tue: ['0900', '1500'],
      wed: ['0900', '1500'],
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: null,
    },
    {
      staffId: 'A003',
      name: 'Joe Bloggs',
      mon: ['1400', '2100'],
      tue: ['0900', '1500'],
      wed: null,
      thu: ['1200', '1900'],
      fri: null,
      sat: ['0830', '1215'],
      sun: ['1620', '2210'],
    },
  ] },
], (err, newDocs) => {
  if (err) return console.log(err);
  console.log('Inserted:', newDocs);
});

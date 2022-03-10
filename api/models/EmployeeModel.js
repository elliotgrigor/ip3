const AccessModel = require('./AccessModel');
const AddressModel = require('./AddressModel');
const ContactModel = require('./ContactModel');
const DailyHoursModel = require('./DailyHoursModel');
const PayslipModel = require('./PayslipModel');

class EmployeeModel {
  constructor(
    staffNumber,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    profilePic,
    access,
    password,
    contact,
    daysWorked,
    payRate,
    natInsNumber,
    payslips,
  ) {
    return {
      staffNumber: staffNumber,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      gender: gender,
      profilePic: profilePic,
      access: access,
      password: password,
      contact: contact,
      daysWorked: daysWorked,
      payRate: payRate,
      natInsNumber: natInsNumber,
      payslips: payslips,
    }
  }
}

exports.EmployeeModel = EmployeeModel;
exports.AccessModel = AccessModel;
exports.AddressModel = AddressModel;
exports.ContactModel = ContactModel;
exports.DailyHoursModel = DailyHoursModel;
exports.PayslipModel = PayslipModel;


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

module.exports = EmployeeModel;


class PayslipModel {
  constructor(
    grossPay,
    netPay,
    natInsContrib,
    incomeTax,
    taxCode,
    pensionContrib,
    issueDate,
  ) {
    return {
      grossPay: grossPay,
      netPay: netPay,
      natInsContrib: natInsContrib,
      incomeTax: incomeTax,
      taxCode: taxCode,
      pensionContrib: pensionContrib,
      issueDate: issueDate,
    }
  }
}

module.exports = PayslipModel;


exports.home = (req, res) => {
  res.render('index', {});
};

exports.profile = (req, res) => {
  res.render('staffProfile', {});
}

exports.editProfile = (req, res) => {
  res.render('editProfile', {});
}

exports.payslips = (req, res) => {
  res.render('viewPayslip', {});
}

exports.viewRota = (req, res) => {
  res.render('archiveRota', {});
}
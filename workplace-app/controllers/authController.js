
exports.login = (req, res) => {
  return res.render('login', {});
}

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return console.log(err.message);
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
}

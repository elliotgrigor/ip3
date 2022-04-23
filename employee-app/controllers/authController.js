const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const db = require('./dbController');

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.employees.findOne(
    { staffNumber: username },
    (err, doc) => {
      if (err) return cb(err);
      if (!doc) return cb(null, false, { message: 'Incorrect username or password.' });

      bcrypt.compare(password, doc.password, (err, result) => {
        if (err) return cb(err);
        if (!result) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, doc);
      });
    }
  );
}));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { ...user });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

exports.login = (req, res) => {
  return res.render('login1', {
    css: { url: '/css/login1.css' }
  });
}

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return console.log(err.message);
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
}

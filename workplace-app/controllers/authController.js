const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const db = require('./dbController');

passport.use(new LocalStrategy(function verify(username, password, done) {
  db.employees.findOne(
    { staffNumber: username },
    (err, doc) => {
      if (err) return done(err);
      if (!doc) return done(null, false, { message: 'Incorrect username or password.' });

      bcrypt.compare(password, doc.password, (err, result) => {
        if (err) return done(err);
        if (!result) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, doc);
      });
    }
  );
}));

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { ...user });
  });
});

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});

exports.login = (req, res) => {
  return res.render('login2', {
    css: { url: '/css/login.css' },
  });
}

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return console.log(err.message);
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
}

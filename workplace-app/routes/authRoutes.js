const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const controller = require('../controllers/authController');
const db = require('../../api/controllers/dbController');
db.load();

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.employees.findOne(
    { staffNumber: username },
    { staffNumber: 1, password: 1, 'access.level': 1 },
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
    cb(null, { id: user.id, username: user.username });
  });

  const userData = { ...user };

  passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
      user = userData;
      return cb(null, user);
    });
  });
});

router.get('/login', controller.login);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

module.exports = router;

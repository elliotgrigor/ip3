const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const controller = require('../controllers/authController');
const db = require('../../api/controllers/dbController');
db.load();

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.employees.findOne({ staffNumber: username }, (err, doc) => {
    if (err) return cb(err);
    if (!doc) return cb(null, false, { message: 'Incorrect username or password.' });

    bcrypt.compare(password, doc.password, (err, result) => {
      if (err) return cb(err);
      if (!result) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, doc);
    });
  });
}));

router.get('/login', controller.login);
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/',
}));

module.exports = router;

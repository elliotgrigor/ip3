const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/authController');

router.get('/login', controller.login);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}), (req, res) => {
  console.log('Logged in');
});
router.post('/logout', controller.logout);

module.exports = router;

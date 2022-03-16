const express = require('express');
const router = express.Router();

const controller = require('../controllers/pageController');

const passportAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

router.get('/', passportAuth, controller.home);

router.get('/profile', passportAuth, controller.profile);
router.get('/profile/edit', passportAuth, controller.editProfile);
router.post('/profile/edit', passportAuth, controller.editProfile);

router.get('/employees', passportAuth, controller.employees);
router.get('/employees/:staffNumber/edit', passportAuth, controller.employees);

router.get('/timeClock', controller.timeClock);

router.get('/payslips', controller.payslips); 
router.get('/view-rota', controller.viewRota);
router.get('/add-shift', controller.addShift);
//punch in pug file should be camel cased
router.get('/view-employee', controller.viewEmployee);
router.get('/add-employee', controller.addEmployee);

module.exports = router;

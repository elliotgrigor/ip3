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

router.get('/employees', passportAuth, controller.listEmployees);
router.get('/employees/add', controller.addEmployee);
router.get('/employees/:staffNumber', controller.viewEmployee);
router.get('/employees/:staffNumber/edit', passportAuth, controller.editEmployee);
router.post('/employees/:staffNumber/edit', passportAuth, controller.editEmployee);

router.get('/timeClock', controller.timeClock);
router.get('/payslips', controller.payslips);

router.get('/rota', controller.viewRota);
router.get('/rota/add-shift', controller.addShift);

module.exports = router;

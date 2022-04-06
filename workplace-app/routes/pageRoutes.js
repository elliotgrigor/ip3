const express = require('express');
const router = express.Router();

const pages = require('../controllers/pageController');

const passportAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

router.get('/', passportAuth, pages.home);

router.get('/profile', passportAuth, pages.profile);
router.get('/profile/edit', passportAuth, pages.editProfile);
router.post('/profile/edit', passportAuth, pages.editProfile);

router.get('/employees', passportAuth, pages.listEmployees);
router.get('/employees/add', passportAuth, pages.addEmployee);
router.get('/employees/:staffNumber', passportAuth, pages.viewEmployee);
router.get('/employees/:staffNumber/edit', passportAuth, pages.editEmployee);
router.post('/employees/:staffNumber/edit', passportAuth, pages.editEmployee);

router.get('/timeClock', passportAuth, pages.timeClock);
router.post('/timeClock', passportAuth, pages.timeClock);
router.get('/payslips', passportAuth, pages.payslips);

router.get('/rota', passportAuth, pages.viewRota);
router.get('/rota/:weekStart/:day/:staffId/edit', passportAuth, pages.editShift);
router.post('/rota/:weekStart/:day/:staffId/edit', passportAuth, pages.editShift);
router.get('/rota/add-shift', passportAuth, pages.addShift);

module.exports = router;

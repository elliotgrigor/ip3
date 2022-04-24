const express = require('express');
const router = express.Router();

const pages = require('../controllers/pageController');

router.get('/', pages.home);

router.get('/profile', pages.profile);
router.get('/profile/edit', pages.editProfile);
router.post('/profile/edit', pages.editProfile);

router.get('/employees', pages.listEmployees);
router.get('/employees/add', pages.addEmployee);
router.post('/employees/add', pages.addEmployee);
router.get('/employees/:staffNumber', pages.viewEmployee);
router.get('/employees/:staffNumber/edit', pages.editEmployee);
router.post('/employees/:staffNumber/edit', pages.editEmployee);
router.get('/employees/:staffNumber/delete', pages.removeEmployee);

router.get('/timeClock', pages.timeClock);
router.post('/timeClock', pages.timeClock);

router.get('/payslips', pages.payslips);

router.get('/rota', pages.viewRota);
router.get('/rota/add-schedule', pages.addSchedule);
router.post('/rota/add-schedule', pages.addSchedule);
router.get('/rota/:weekStart/:day/:staffId/edit', pages.editShift);
router.post('/rota/:weekStart/:day/:staffId/edit', pages.editShift);

module.exports = router;

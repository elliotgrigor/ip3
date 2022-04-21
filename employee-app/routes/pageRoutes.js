const express = require('express');
const router = express.Router();

const page = require('../controllers/pageController');

router.get('/', page.home);

router.get('/profile', page.profile);
router.get('/profile/edit', page.editProfile);
router.post('/profile/edit', page.editProfile);

router.get('/payslips', page.payslipList);
router.get('/payslips/:id', page.viewPayslip);
router.get('/payslips/:id/download', page.downloadPayslip);

router.get('/rota', page.rotaList);
router.get('/rota/:weekStart', page.viewRota);
router.get('/rota/:weekStart/download', page.downloadRota);

module.exports = router;

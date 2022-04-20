const express = require('express');
const router = express.Router();

const page = require('../controllers/pageController');

router.get('/', page.home);

router.get('/profile', page.profile);
router.get('/profile/edit', page.editProfile);
router.post('/profile/edit', page.editProfile);

router.get('/payslips', page.payslips);

router.get('/rota', page.rotaList);
router.get('/rota/:weekStart/:staffId', page.viewRota);

module.exports = router;

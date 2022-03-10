const express = require('express');
const router = express.Router();

const controller = require('../controllers/pageController');

router.get('/login', controller.login);
router.post('/login', controller.login);

router.use('*', controller.authCheck);

router.get('/', controller.home);
router.get('/payslips', controller.payslips); 
router.get('/rota', controller.rota);
//router.post('/rota', controller.rota);
router.get('/myDetails', controller.myDetails);
router.get('/punchIn', controller.punchIn);
router.get('/employee', controller.employee);

module.exports = router;

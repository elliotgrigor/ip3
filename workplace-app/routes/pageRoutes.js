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
router.get('/payslips', controller.payslips); 
router.get('/rota', controller.rota);
//router.post('/rota', controller.rota);
router.get('/myDetails', controller.myDetails);
router.get('/punchIn', controller.punchIn);
router.get('/employee', controller.employee);

module.exports = router;

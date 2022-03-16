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
router.get('/viewRota', controller.viewRota);
router.get('/addShift', controller.addShift);
router.get('/myDetails', controller.myDetails);
//punch in pug file should be camel cased
router.get('/punchIn', controller.punchIn);
router.get('/employees', controller.employees);
router.get('/viewEmployee', controller.viewEmployee);
router.get('/addEmployee', controller.addEmployee);
// couldn't the below 2 pages be one page that change depending on access level?
router.get('/editEmployeeDetails', controller.editEmployeeDetails);
router.get('/editMyDetails', controller.editMyDetails);
module.exports = router;

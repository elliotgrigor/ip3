const express = require('express');
const router = express.Router();

const employee = require('../controllers/employeeController');

router.get('/get/employee/all', employee.getAll);
router.get('/get/employee/id/:staffNumber', employee.getById);
router.get('/get/employee/level/:accessLevel', employee.getByLevel);

module.exports = router;

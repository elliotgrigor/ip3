const express = require('express');
const router = express.Router();

const controller = require('../controllers/apiController');

router.get('/get/employee/all', controller.getAllEmployees);
router.get('/get/employee/id/:staffNumber', controller.getEmployeeById);
router.get('/get/employee/level/:accessLevel', controller.getEmployeesByLevel);

module.exports = router;

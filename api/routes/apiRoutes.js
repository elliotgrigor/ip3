const express = require('express');
const router = express.Router();

const employee = require('../controllers/employeeController');
const rota = require('../controllers/rotaController');

router.get('/get/employee/all', employee.getAll);
router.get('/get/employee/id/:staffNumber', employee.getById);
router.get('/get/employee/level/:accessLevel', employee.getByLevel);

router.get('/get/rota/week/:weekStart', rota.getByWeek);

module.exports = router;

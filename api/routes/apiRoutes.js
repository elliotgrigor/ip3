const express = require('express');
const router = express.Router();

const controller = require('../controllers/apiController');

router.get('/get/employee/all', controller.getAllEmployees);

module.exports = router;

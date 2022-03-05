const express = require('express');
const router = express.Router();

const controller = require('../controllers/pageController');

router.get('/', controller.home);

module.exports = router;

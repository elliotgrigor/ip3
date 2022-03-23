const express = require('express');
const router = express.Router();

const page = require('../controllers/pageController');

router.get('/', page.home);

module.exports = router;

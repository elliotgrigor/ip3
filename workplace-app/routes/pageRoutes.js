const express = require('express');
const router = express.Router();

const controller = require('../controllers/pageController');

router.get('/', controller.home);
router.get('/login', controller.login);
router.post('/login', controller.login);


module.exports = router;

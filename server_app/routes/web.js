const express = require('express');
const router = express.Router();
const HomeController = require('../Controller/HomeController');
const AuthController = require('../Controller/AuthController');
const authenticateToken = require('../Middleware/authenticateToken'); 

router.get('/', authenticateToken, HomeController.home);



router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
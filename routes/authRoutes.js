const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController.js');

router.post('/register', authController.register);

router.get('/check', authController.check);

router.post('/login', authController.login);

router.post('/register-warden', authController.registerWarden);

router.post('/register-coordinator', authController.registerCoordinator);

router.post('/logout', authController.logout);


module.exports = router;

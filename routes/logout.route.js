const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

/* Get Index Page*/
router.get('/', authController.logout);


module.exports = router;
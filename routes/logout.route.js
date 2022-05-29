const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/user.controller');

/* Get Index Page*/
router.get('/', LoginController.logout);


module.exports = router;
const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const initial = require('../controllers/initial.controller')
const validation = require('../middleware/validation.middleware');

/* Get Index Page*/
router.get('/', validation.isLogged,initial.renderLogin);

/*Post User Login*/ 
router.post("/PostLogin",validation.isLogged, authController.Login);

module.exports = router;
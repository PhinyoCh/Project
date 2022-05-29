const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/user.controller');
const initial = require('../controllers/initial.controller')
const validation = require('../middleware/validation.middleware');

/* Get Index Page*/
router.get('/', validation.isLogged,initial.renderLogin);

/*Post User Login*/ 
router.post("/PostLogin",validation.isLogged, LoginController.checkUserLogin);

module.exports = router;
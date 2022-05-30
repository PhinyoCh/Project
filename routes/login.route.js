const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const RenderController = require('../controllers/render.controller')
const validation = require('../middleware/validation.middleware');

/* Get Index Page*/
router.get('/', validation.isLogged,RenderController.renderLogin);

/*Post User Login*/ 
router.post("/PostLogin",validation.isLogged, AuthController.Login);

module.exports = router;
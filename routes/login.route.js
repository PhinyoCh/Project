const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/user.controller');

/* Get Index Page*/
router.get('/',LoginController.getPage)

/*Post User Login*/ 
router.post("/PostLogin",LoginController.checkUserLogin)

module.exports = router;
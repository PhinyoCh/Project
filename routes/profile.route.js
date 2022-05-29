const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation.middleware')
const initialController = require('../controllers/initial.controller');

router.get('/', validation.isAuth, initialController.renderProfile);

module.exports = router;
const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation.middleware')
const RenderController = require('../controllers/render.controller')

router.get('/', validation.isAuth, RenderController.renderProfile);

module.exports = router;
const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation.middleware');
const socketController = require('../controllers/socket.controller')

router.get("/",socketController.broadcastToRaspi);

module.exports = router;
const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation.middleware');
const socketController = require('../controllers/socket.controller')

router.post("/",socketController.broadcastToRaspi);

module.exports = router;
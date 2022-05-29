const express = require('express');
const router = express.Router();
const RoomcController = require('../controllers/room.controller')
const validation = require('../middleware/validation.middleware')
const initialController = require('../controllers/initial.controller');

router.get('/', validation.isAuth, initialController.renderIndex);

router.post("/search",RoomcController.searchRoom);



module.exports = router;
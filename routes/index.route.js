const express = require('express');
const router = express.Router();
const RoomcController = require('../controllers/room.controller')
const validation = require('../middleware/validation.middleware')
const RenderController = require('../controllers/render.controller')

router.get('/', validation.isAuth, RenderController.renderIndex);

router.post("/search",RoomcController.searchRoom);

router.post("/PostEditRoom", validation.isAdminRoute, RoomcController.editRoom);

router.post("/PostRemoveRoom", validation.isAdminRoute, RoomcController.removeRoom);

module.exports = router;
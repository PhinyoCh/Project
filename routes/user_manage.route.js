const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/', function(req,res,next){
    res.render('user_manage');
})

router.get("/GetRoomDataAll")

router.post("/AddUserAccount",UserController.regisUser);

router.post("/RemoveRoomData")

router.post("/EditRoomData")

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/', function(req,res,next){
    res.render('user_manage');
})

router.get("/GetRoomDataAll")

router.post("/AddRoomData")

router.post("/RemoveRoomData")

router.post("/EditRoomData")

module.exports = router;
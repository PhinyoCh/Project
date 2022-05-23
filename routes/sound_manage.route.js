const express = require('express');
const router = express.Router();

router.get('/', function(req,res,next){
    res.render('sound_manage');
})

router.get("/upload")

module.exports = router;
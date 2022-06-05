const express = require('express');
const router = express.Router();

router.get('/', function(req,res,next){
    res.render('test_play_sound');
})


module.exports = router;
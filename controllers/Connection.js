const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Login = require("../models/Login");
const { reject } = require("bcrypt/promises");


router.post("/", function (req, res, next){
        //res.send("connect");

        console.log(req.body.key)
    })

module.exports = router;
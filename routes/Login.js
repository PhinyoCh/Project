const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Login = require("../models/Login");
const { reject } = require("bcrypt/promises");


router.post("/PostLogin", async function (req, res, next){
    let username = req.body.username;
    let password = req.body.password;

    let dataUser = await checkUser(username);
    if(dataUser.length > 0){
        let match = await bcrypt.compare(password, dataUser[0]["password"]);
        if (match){
            res.json({data: dataUser});
        } else{
            res.json({status: "Failed", data: "Incorrect Password"});
        }
    }


})

async function checkUser(username){
    return new Promise((resolve, reject)=>{
        try {
            Login.checkUser(username, (err, rows) => {
                if (rows != null){
                    resolve(rows);
                }else{
                    resolve(false);
                }
            });
        } catch (err){
            console.log(err);
            resolve(false);
        }
    })

}

module.exports = router;
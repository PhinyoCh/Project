const bcrypt = require('bcrypt');
const {encrypt, decrypt} = require("../utils/encrypt_decrypt_tools");
const config = require("../config/server.config");
const user = require('../models/user.model');
module.exports = { 
    Login: async function (req, res, next){
        let username = req.body.username;
        let password = req.body.password;
        let dataUser = await user.getUserWithPass(username);
        if(dataUser.length > 0){
            let match = await bcrypt.compare(password,dataUser[0]['password']);
            if (match){
                await user.getUserData(username).then(function(result){
                    res.cookie('usd', encrypt(JSON.stringify(result)),config.cookie_options);
                    return res.json({status: "successes"})
                });
            } else{
               return res.json({status: "Failed", data: "Incorrect Password"});
            }
        }else{
            return res.json({status: "Failed", data: "This username isn't exist"});
        }
},
logout : function(req,res,next){
    res.clearCookie("usd");
    res.status(200).redirect(config.url + '/Login');
},
}
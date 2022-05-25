const bcrypt = require("bcrypt");
const user = require("../models/user.model");
const {encrypt, decrypt} = require("../utils/encrypt_decrypt_tools")
const config = require("../config/server.config")

module.exports = {
    getPage: function(req, res){
        res.render('login');
    },
    checkUserLogin: async function (req, res, next){
            let username = req.body.username;
            let password = req.body.password;
            console.log(password);
            let dataUser = await user.getUserWithPass(username);
            // return res.json({"length":dataUser[0]});
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
    regisUser :async function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        let checkExist = await user.getUserData(username);
        if (checkExist.length > 0){
            return res.json({status:"Failed",data:"Username already used"})
        }
        let hash_password = await bcrypt.hash(password,10)
        await user.addUser(req.body,hash_password).then(
            ()=>{ return res.json({status:"Successes",data:"Registration is Successful"})}
        );
    }



}


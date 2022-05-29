const bcrypt = require("bcrypt");
const user = require("../models/user.model");
const {encrypt, decrypt} = require("../utils/encrypt_decrypt_tools")
const config = require("../config/server.config")
module.exports = {
    
    checkUserLogin: async function (req, res, next){
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
    },
    searchUser : async function (req, res, next){
        let search = req.query.search;
        if(!search){
        let userData = await user.getAllUserData();
        res.send(userData);
        }else{
            res.json({search:search});
        }
    },
    editUser : async function(req,res){
        let update_by =  JSON.parse(decrypt(req.cookies.usd))[0].user_id;
        await user.editUser(req.body,update_by).then(function(){
            return res.json({status:'successes'});
        })
        
    },
    removeUser : async function(req,res){
        var update_by =  JSON.parse(decrypt(req.cookies.usd))[0].user_id;
        var user_id = req.body.user_id;
        var update_date = req.body.update_date;
        if(user_id == update_by){
           return res.json({status:'error self remove'});
        }
        await user.deleteUser(req.body,update_by).then(function(){
            return res.json({status:'successes','update_by':update_by,'user_id':user_id,'update_date':update_date});
            
        });
        
    }



}


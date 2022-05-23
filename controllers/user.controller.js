const bcrypt = require("bcrypt");
const user = require("../models/user.model");

module.exports = {
    getPage: function(res){
        res.render('login');
    },
    checkUserLogin: async function (req, res, next){
            let username = req.body.username;
            let password = req.body.password;
            let dataUser = await user.getUserData(username);
            // return res.json({"length":dataUser[0]});
            if(dataUser.length > 0){
                let hash_password = dataUser[0]["password"];
                let a =await bcrypt.hash(password,10);
                console.log(a);
                console.log(hash_password);
                let match = await bcrypt.compare(password,hash_password);
                if (match){
                   return res.json({data: dataUser});
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


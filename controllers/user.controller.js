const bcrypt = require("bcrypt");
const user = require("../models/user.model");

module.exports = {

    getPage: function(res){
        res.render('login');
    },

    checkUserLogin: async function (req, res, next){
            let username = req.body.username;
            let password = req.body.password;
            let dataUser = await user.checkUser(username);
            if(dataUser.length > 0){
                let match = await bcrypt.compare(password, dataUser[0]["password"]);
                if (match){
                    res.json({data: dataUser});
                } else{
                    res.json({status: "Failed", data: "Incorrect Password"});
                }
            }
    }
}


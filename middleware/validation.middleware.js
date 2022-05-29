const config = require('../config/server.config');
const encrypt_decrypt_tools = require('../utils/encrypt_decrypt_tools');

module.exports = {
    isLogged : function (req,res,next){
        const token = req.cookies.usd;
        if(token){
            res.status(200).redirect(config.url);
            return;
        }else{
            next();
        }
    },
    isAuth : function (req,res,next){
        const token = req.cookies.usd;
        if(token){
            next();
        }else{
            res.status(200).redirect(config.url + '/Login');
            return;
        }
    },
    isAdminRoute: function(req,res,next){
        const {cookies} = req;
        var user_data = JSON.parse(encrypt_decrypt_tools.decrypt(cookies.usd));
        if(user_data[0].user_role == '2'){
            next();
        }else{
            res.render('404');
            return;
        }
    },
    
}
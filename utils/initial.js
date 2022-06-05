const encrypt_decrypt_tools = require('../utils/encrypt_decrypt_tools');

module.exports = {
    getUserData : function(req){
        const {cookies} = req;
        return JSON.parse(encrypt_decrypt_tools.decrypt(cookies.usd));
    },
    getUserID : function(req){
        const {cookies} = req;
        return JSON.parse(encrypt_decrypt_tools.decrypt(cookies.usd))[0].user_id;
    },
    getUsername : function(req){
        const {cookies} = req;
        return JSON.parse(encrypt_decrypt_tools.decrypt(cookies.usd))[0].username;
    },
    getName : function(req){
        const {cookies} = req;
        let s_name = JSON.parse(encrypt_decrypt_tools.decrypt(cookies.usd))[0].s_name;
        let l_name = JSON.parse(encrypt_decrypt_tools.decrypt(cookies.usd))[0].l_name;
        return s_name[0].toUpperCase()+ s_name.slice(1) + " " + l_name[0].toUpperCase()+ l_name.slice(1);
    },
    getEmail : function(req){
        const {cookies} = req;
        return JSON.parse(encrypt_decrypt_tools.decrypt(cookies.usd))[0].email;
    },
    getUserRole : function(req){
        const {cookies} = req;
        let role = JSON.parse(encrypt_decrypt_tools.decrypt(cookies.usd))[0].user_role;
        if(role == 1){
            return 'Staff';
        } else if (role == 2){
            return 'Admin'
        } else {
            return 'Guest';
        }
    }
}
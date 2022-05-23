const db = require("../config/dbconnection");

var Login ={
    checkUser: function (username, callback){
        return db.query(
            "SELECT * FROM `user` AS u WHERE u.username = ?",
            [username], 
            callback
        );
    }
}

module.exports = Login;
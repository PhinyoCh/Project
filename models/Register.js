const db = require("../dbconnection");

var Register ={
    addUser: function (date,password, callback){
        return db.query(
            "SELECT * FROM `user` AS u WHERE u.username = ?",
            [username], 
            callback
        );
    }
}

module.exports = Register;
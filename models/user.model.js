const db = require("../config/dbconnection");

module.exports = {
    getUserData: function (username, callback){
        return db.query(
            "SELECT * FROM `user` AS u WHERE u.username = ?",
            [username], 
            (resolve, reject) => {
                try {
                    (err, rows) => {
                        if (rows != null){
                            resolve(rows);
                        }else{
                            resolve(false);
                        }
                    }
                } catch (err) {
                    console.log(err);
                    resolve(false);
                }
            }
        );
    },
    addUser: function (date,password, callback){
        return db.query(
            "SELECT * FROM `user` AS u WHERE u.username = ?",
            [username], 
            callback
        );
    }
}

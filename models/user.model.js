const db = require("../config/dbconnection");

module.exports = {
    getUserData:async function (username){
        var [rows] = await db.promise().query(
            'SELECT * FROM `user` AS u WHERE u.username = ? AND active = 1',
            [username])
        return rows;
    },
    addUser: function (data,hash_password, callback){
        return db.promise().query(
            "INSERT INTO `user`(`email`, `username`, `password`, `s_name`, `l_name`, `user_role`, `active`, `create_by`, `create_date`, `update_by`, `update_date`) "+
            "VALUES (?,?,?,?,?,?,?,?,?,?,?) ",
            [
                data.email,
                data.username,
                hash_password,
                data.s_name,
                data.l_name,
                data.user_role,
                data.active,
                data.user_id,
                data.date,
                data.user_id,
                data.date
            ]
        )
    }
}

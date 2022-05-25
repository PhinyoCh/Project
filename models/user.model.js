const db = require("../config/dbconnection");

module.exports = {
    getUserData:async function (username){
        var [rows] = await db.promise().query(
            'SELECT `user_id`, `email`, `username`, `s_name`, `l_name`, `user_role`, `active`, `create_by`, `create_date`, `update_by`, `update_date` FROM `user` AS u WHERE u.username = ? AND active = 1',
            [username])
        return rows;
    },

    getUserWithPass:async function (username){
        var [rows] = await db.promise().query(
            'SELECT * FROM `user` AS u WHERE u.username = ? AND active = 1',
            [username])
        return rows;
    },

    //function Add User
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
    },

    editUser: function (data){
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
    },

    deleteUser: async function (user_id){
        var [rows] = await db.promise().query(
            "UPDATE `user` SET active = '0' WHERE user_id = (`user_id`) "+
            "VALUES (?) ",
            [
                user_id
            ]
        )
    }

}

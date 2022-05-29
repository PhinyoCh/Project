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

    getAllUserData:async function (){
        var [rows] = await db.promise().query(
            'SELECT `user_id`, `email`, `username`, `s_name`, `l_name`, `user_role`, `active`, `create_by`, `create_date`, `update_by`, `update_date` FROM `user` WHERE active = 1'
            )
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
                data.create_date,
                data.user_id,
                data.update_date
            ]
        )
    },

    editUser:async function (data,update_by){
        var [rows,field] = await db.promise().query(
            "UPDATE `user` SET `email` = ?, `s_name` = ?, `l_name` = ?, `user_role` = ?, `active` = ?, `update_by` = ?, `update_date` = ? WHERE `active` = '1' AND user_id = ?",
            [
                data.email,
                data.s_name,
                data.l_name,
                data.user_role,
                data.active,
                update_by,
                data.update_date,
                data.user_id
            ]
        )
        return {rows,field};
    },

    deleteUser: async function (data,update_by){
        var [rows,field] = await db.promise().query(
            "UPDATE `user` SET `active` = 0, `update_by` = ?, `update_date` = ? WHERE `active` = '1' AND user_id = ?",
            [                
                update_by,
                data.update_date,
                data.user_id
            ]
        )
        return {rows,field};
    }

}

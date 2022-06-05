const db = require("../config/dbconnection");

module.exports = {
    getAllRoom:async function (callback){
        var [rows] = await db.promise().query(
            'SELECT * FROM `room` WHERE active = 1',
            )
        return rows;
    },

    deleteRoom: async function (data,update_by){
        var [rows,field] = await db.promise().query(
            "UPDATE `room` SET `active` = 0, `update_by` = ?, `update_date` = ? WHERE `active` = '1' AND room_id = ?",
            [                
                update_by,
                data.update_date,
                data.room_id
            ]
        )
        return {rows,field};
    },

    editRoom:async function (data,update_by){
        var [rows,field] = await db.promise().query(
            "UPDATE `room` SET `room_name` = ?, `room_number` = ?, `floor` = ?, `update_by` = ?, `update_date` = ? WHERE `active` = '1' AND room_id = ?",
            [
                data.room_name,
                data.room_number,
                data.floor,
                update_by,
                data.update_date,
                data.room_id
            ]
        )
        return {rows,field};
    },

    setActiveRoom:async function (data,update_by){
        var [rows,field] = await db.promise().query(
            "UPDATE `room` SET `status` = 1 WHERE `active` = '1' AND mac_address = ?",
            [
                data.mac_address                
            ]
        )
        return {rows,field};
    },

    setinActiveRoom:async function (data,update_by){
        var [rows,field] = await db.promise().query(
            "UPDATE `room` SET `status` = 0 WHERE `active` = '1' AND mac_address = ?",
            [
                data.mac_address                
            ]
        )
        return {rows,field};
    },

    addRoom: function (data, update_by, callback){

        return db.promise().query(
            "INSERT INTO `room`(`room_name`, `room_number`, `mac_address`, `floor`, `status`, `active`, `create_by`, `create_date`, `update_by`, `update_date`) "+
            "VALUES (?,?,?,?,?,?,?,?,?,?) ",
            [
                data.room_name,
                data.room_number,
                data.mac_address,
                data.floor,
                data.status,
                data.active,
                update_by,
                data.update_date,
                update_by,
                data.create_date
            ],
            callback
        );
    }
}
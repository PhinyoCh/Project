const db = require("../config/dbconnection");

module.exports = {
    getAllRoom:async function (callback){
        var [rows] = await db.promise().query(
            'SELECT * FROM `room` WHERE active = 1',
            )
        return rows;
    },

    getMacRoom:async function (mac_address){
        var [rows] = await db.promise().query(
            'SELECT * FROM `room` WHERE mac_address = ? AND active = 1',
            [
                mac_address
            ]
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
            "UPDATE `room` SET `room_name` = ?, `room_number` = ?, `isNew` = 0, `floor` = ?, `update_by` = ?, `update_date` = ? WHERE `active` = '1' AND room_id = ?",
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

    setStatusRoom:async function (status, socket_id){
        if(status == 0 )
        {
            return new Error("Status can not be 0");
        }
        var [rows,field] = await db.promise().query(
            "UPDATE `room` SET `status` = ? WHERE `active` = '1' AND socket_id = ?",
            [
                status, // 1 = connected , 2 = disconnect 
                socket_id        
            ]
        )
        return {rows,field};
    },

    setSocketID:async function (mac_address, socket_id){
        var [rows,field] = await db.promise().query(
            "UPDATE `room` SET `socket_id` = ? ,`status` = 1 WHERE `active` = '1' AND mac_address = ?",
            [ 
                socket_id, // 1 = connected , 2 = disconnect 
                mac_address        
            ]
        )
        return {rows,field};
    },

    addRoom: function (data, callback){

        return db.promise().query(
            "INSERT INTO `room`(`room_name`, `mac_address`, `status`, `socket_id`, `isNew`, `active`, `create_by`, `create_date`, `update_by`, `update_date`) "+
            "VALUES (?,?,1,?,1,1,0,?,0,?) ",
            [
                data.DEVICE_NAME,
                data.MAC_ADDRESS,
                data.SOCKET_ID,
                data.TIMESTAMP,
                data.TIMESTAMP
            ],
            callback
        );
    }
}
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

    addRoom: function (data, callback){
        var user_id = data.user_id;
        var room_name = data.room_name;
        var room_number = data.room_number;
        var floor = data.floor;
        var active = data.active;
        var mac_address = data.mac_address;
        var date = data.date;

        return db.query(
            "INSERT INTO room (room_name,room_number,mac_address,floor,active,create_by,create_date,update_by,update_date) "+
            "VALUES (?,?,?,?,?,?,?,?,?) ",
            [
                room_name,
                room_number,
                mac_address,
                floor,
                active,
                user_id,
                date,
                user_id,
                date
            ],
            callback
        );
    }
}
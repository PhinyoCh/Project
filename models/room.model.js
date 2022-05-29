const db = require("../config/dbconnection");

module.exports = {
    getAllRoom:async function (callback){
        var [rows] = await db.promise().query(
            'SELECT * FROM `room` WHERE active = 1',
            )
        return rows;
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
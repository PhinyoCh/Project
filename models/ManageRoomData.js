const db = require("../config/dbconnection");

var Roomdata ={
    getAllDataRoom: function (callback){
        return db.query(
            "SELECT * FROM `room` AS r WHERE r.active = 0", 
            callback
        );
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



module.exports = Roomdata;
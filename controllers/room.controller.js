const GetRoomData = require("../models/room.model.js");

module.exports = {
    getAllRoom : async function (req, res, next){
        let allDataRoom = await getAllDataRoom();
            console.log("Data ",allDataRoom)
            res.json({data : allDataRoom});
    },
    addRoom :  async function (req, res, next){
        var user_id = req.body.user_id;
        var room_name = req.body.room_name;
        var room_number = req.body.room_number;
        var floor = req.body.floor;
        var active = req.body.active;
        var mac_address = req.body.mac_address;
        var date = req.body.date;  
        
        // res.send(user_id + " "+ room_name + " "+ room_number  +" "+ floor +" "+ active +" "+ mac_address +" "+ date);
    }
}


const express = require("express");
const router = express.Router();
const GetRoomData = require("../models/ManageRoomData.js");

router.get("/GetRoomDataAll", async function (req, res, next){
    let allDataRoom = await getAllDataRoom();
        console.log("Data ",allDataRoom)
        res.json({data : allDataRoom});
})

router.post("/AddRoomData", async function (req, res, next){
    var user_id = req.body.user_id;
    var room_name = req.body.room_name;
    var room_number = req.body.room_number;
    var floor = req.body.floor;
    var active = req.body.active;
    var mac_address = req.body.mac_address;
    var date = req.body.date;
    
    
    // res.send(user_id + " "+ room_name + " "+ room_number  +" "+ floor +" "+ active +" "+ mac_address +" "+ date);
})

router.post("/RemoveRoomData", async function (req, res, next){
    
})

router.post("/EditRoomData", async function (req, res, next){
    
})

async function getAllDataRoom(){
    return new Promise((resolve, reject)=>{
        try {
            GetRoomData.getAllDataRoom( (err, rows) => {
                if (rows != null){
                    resolve(rows);
                }else{
                    resolve(false);
                }
            });
        } catch (err){
            console.log(err);
            resolve(false);
        }
    })

}

module.exports = router;
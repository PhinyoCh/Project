const room = require("../models/room.model.js");
const {encrypt, decrypt} = require("../utils/encrypt_decrypt_tools");

module.exports = {
    getAllRoom : async function (req, res, next){
        let allDataRoom = await getAllDataRoom();
            console.log("Data ",allDataRoom)
            res.json({data : allDataRoom});
    },

    searchRoom : async function (req, res, next){
        let search = req.query.search;
        if(!search){
        let roomData = await room.getAllRoom();
        res.send(roomData);
        }else{
            res.json({search:search});
        }
    },

    removeRoom : async function (req, res, next){
        let update_by =  JSON.parse(decrypt(req.cookies.usd))[0].user_id;
        await room.deleteRoom(req.body,update_by).then(function(){
            return res.json({status:'successes'});
        })
    },

    editRoom : async function (req, res, next){
        let update_by =  JSON.parse(decrypt(req.cookies.usd))[0].user_id;
        await room.editRoom(req.body,update_by).then(function(){
            return res.json({status:'successes'});
        })
    },

    addRoom :  async function (req, res, next){
        let update_by =  JSON.parse(decrypt(req.cookies.usd))[0].user_id;
        await room.addRoom(req.body,update_by).then(function(){
            return res.json({status:'successes'});
        })
    }
}


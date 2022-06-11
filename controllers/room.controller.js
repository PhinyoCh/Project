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
            return res.json({status:'Successes'});
        })
    },

    editRoom : async function (req, res, next){
        let update_by =  JSON.parse(decrypt(req.cookies.usd))[0].user_id;
        await room.editRoom(req.body,update_by).then(function(){
            return res.json({status:'Successes'});
        })
    },

    setStatus : async function (status, socket_id){
        await room.setStatusRoom(status, socket_id).then(function(){
            return ;
        })
    },

    addRoom :  async function (data){
        var isExist = await room.getMacRoom(data.MAC_ADDRESS);

        if(isExist.length > 0){ //isn't new node.
            await room.setStatusRoom(1,data.MAC_ADDRESS).then(()=>{
                data.STATUS = 'Device is Connected.';
                // console.log({'STATUS':'Device is Connected.','DEVICE':data});
            })
            await room.setSocketID(data.MAC_ADDRESS, data.SOCKET_ID);
            return;
        } else {// is new node.
            await room.addRoom(data).then(function(){
                // console.log({'STATUS':'New device already added.','DEVICE':data})
            })
        }
        return;
    },
}


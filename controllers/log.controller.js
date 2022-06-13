const log = require("../models/log.model");
const room = require("../models/room.model")

module.exports = {

    savePlayLog : async function (req, res, next){
        
    },

    saveConnectionLog : async function (iden, event, action_date, description){
        const log_type = 1; // connection type
        const action_by = 0; //by system
        //var event; // 10= Disconnect, 11= Connected
        //var field_id; // Room ID
        //var description; // Error, Exception
        //var action_date; // date time 
        if(description === 'Connection Successes'){
            var data = await room.getRoomByMac(iden);
            if(data.length > 0){
                await log.saveLog(data[0].room_name, log_type, event, action_by, action_date, description);
                return;
            } 
            return new Error('Null;'); ;
        }
        var data = await room.getRoomBySocketID(iden);
        if(data.length > 0){
            await log.saveLog(data[0].room_name, log_type, event, action_by, action_date, description);
            return;
        } 


    }    

}

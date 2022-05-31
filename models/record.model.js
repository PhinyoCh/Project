const db = require("../config/dbconnection");

module.exports = {
    getAllsoundData:async function (){
        var [rows] = await db.promise().query(
            'SELECT `record_id`, `record_type`, `record_name`, `record_detail`, `sound_address`, `record_by`, `record_date`, `update_by`, `update_date` FROM `record` WHERE active = 1'
            )
        return rows;
    },
    insertFile:async function(data,filename,update_by){
        var [rows] = await db.promise().query(
            'INSERT INTO `record`( `record_type`, `record_name`, `record_detail`, `sound_address`, `record_by`, `record_date`, `update_by`, `update_date`, `active`) ' +
            'VALUES(?,?,?,?,?,?,?,?,1)',
            [
                data.record_type,
                data.record_name,
                data.record_detail,
                filename,
                update_by,
                data.update_date,
                update_by,
                data.update_date
            ],
        )
        
        return rows;
    }

}

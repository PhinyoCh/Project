const db = require("../config/dbconnection");

module.exports = {
    getAllsoundData:async function (){
        var [rows] = await db.promise().query(
            'SELECT `record_id`, `record_type`, `record_name`, `record_detail`, `sound_address`, `record_by`, `reccord_date`, `update_by`, `update_date` FROM `record` WHERE active = 1'
            )
        return rows;
    },

}

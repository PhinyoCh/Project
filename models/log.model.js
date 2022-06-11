const db = require("../config/dbconnection");

module.exports = {

    saveLog:async function(data,log_type,log_event,action_by){
        var [rows] = await db.promise().query(
            'INSERT INTO `log`( `field_id`, `log_type`, `log_event`, `action_by`, `action_date`, `description` ) ' +
            'VALUES(?,?,?,?,?,?)',
            [
                data.field_id,
                log_type,
                log_event,
                action_by,
                data.update_date,
                description
            ],
        )
        
        return rows;
    }

}

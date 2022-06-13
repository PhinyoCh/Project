const db = require("../config/dbconnection");

module.exports = {

    saveLog:async function(field_id, log_type, log_event, action_by, action_date, description){
        var [rows] = await db.promise().query(
            'INSERT INTO `log`( `field_id`, `log_type`, `log_event`, `action_by`, `action_date`, `description` ) ' +
            'VALUES(?,?,?,?,?,?)',
            [
                field_id,
                log_type,
                log_event,
                action_by,
                action_date,
                description
            ],
        )
        
        return rows;
    }

}

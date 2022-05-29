const record = require("../models/record.model");

module.exports = {

    searchRecord : async function (req, res, next){
        let search = req.query.search;
        if(!search){
        let recordData = await record.getAllsoundData();
        res.send(recordData);
        }else{
            res.json({search:search});
        }
    },
    removeFile : async function (req, res){ 
        console.log("remove")
        
    },
    uploadFile : async function (req, res){ 
        console.log(req.file)
        
    }

}

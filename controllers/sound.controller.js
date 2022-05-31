const record = require("../models/record.model");
const fs = require("fs");
const {decrypt} = require("../utils/encrypt_decrypt_tools");
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
        var update_by =  JSON.parse(decrypt(req.cookies.usd))[0].user_id;
        console.log(req.body)
        // const filename = update_by +'_'+ Math.floor(+new Date() / 1000) +'.mp3';
        // const tmpdir = req.file.destination + "/" + req.file.filename;
        // const storage = './assets/storage/'+ filename;
        // await record.insertFile(req.body,filename,update_by).then(function(rows){
        //     fs.rename( tmpdir, storage, function(err){
        //         if(err){
        //             return res.json({status:'failed',data:err});
        //         }
        //             return res.json({status:'successes'});
        //     })
        // })
    }
}

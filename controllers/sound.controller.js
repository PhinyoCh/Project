const record = require("../models/record.model");
const fs = require("fs");
const {decrypt} = require("../utils/encrypt_decrypt_tools");
const config = require("../config/server.config")
var http = require('http');


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

    editFile : async function (req, res){ 
        var update_by =  JSON.parse(decrypt(req.cookies.usd))[0].user_id;
        var record_id = req.body.record_id;
        var record_name = req.body.record_name;
        var record_detail = req.body.record_detail;
        var update_date = req.body.update_date;

        await record.editSound(req.body,update_by).then(function(){
            return res.json({status:'successes','update_by':update_by,'record_name':record_name,'record_detail':record_detail,'record_id':record_id,'update_date':update_date});
            
        });
        
    },

    removeFile : async function (req, res){ 
        var update_by =  JSON.parse(decrypt(req.cookies.usd))[0].user_id;
        var record_id = req.body.record_id;
        var update_date = req.body.update_date;
       
        await record.deleteSound(req.body,update_by).then(function(){
            return res.json({status:'successes','update_by':update_by,'record_id':record_id,'update_date':update_date});
            
        });
        
    },
    uploadFile : async function (req, res){ 
        var update_by =  JSON.parse(decrypt(req.cookies.usd))[0].user_id;
        const filename = update_by +'_'+ Math.floor(+new Date() / 1000) +'.mp3';
        const tmpdir = req.file.destination + "/" + req.file.filename;
        const storage = './uploads/storage/'+ filename;
        await record.insertFile(req.body,filename,update_by).then(function(rows){
            fs.rename( tmpdir, storage, function(err){
                if(err){
                    return res.json({status:'failed',data:err});
                }
                    return res.json({status:'successes'});
            })
        })
    },

    getreSentFile : async function(req,res){

    },

    getAudioFile : async function(req,res){
        if(!req.query.filename){
            return res.send('idle time');
        }
        var filename = req.query.filename;
        const filePath = './uploads/storage/' + filename;
        var stat = fs.statSync(filePath);
        var total = stat.size;
        if (req.headers.range) {
            var range = req.headers.range;
            var parts = range.replace(/bytes=/, "").split("-");
            var partialstart = parts[0];
            var partialend = parts[1];

            var start = parseInt(partialstart, 10);
            var end = partialend ? parseInt(partialend, 10) : total-1;
            var chunksize = (end-start)+1;
            var readStream = fs.createReadStream(filePath, {start: start, end: end});
            res.writeHead(206, {
                'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                'Accept-Ranges': 'bytes', 
                'Content-Length': chunksize,
                'Content-Type': 'audio/mpeg'
            });
            readStream.pipe(res);
        } 
        else {
            res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
            fs.createReadStream(filePath).pipe(res);
        }
    }
}

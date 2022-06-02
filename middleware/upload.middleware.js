var path = require('path');
const multer = require("multer");

module.exports = {
    validateUploadFile : function(req,res,next){
        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const DIR = `./assets/temp`;
                cb(null, DIR);
            },
        });
        let UploadFile = multer({ storage: storage ,fileFilter:function(req,file, cb){
             // Allowed ext
            const filetypes = /mpeg/;
            // Check mime
            const mimetype = filetypes.test(file.mimetype);
            if(mimetype){
                cb(null,true);
            } else {
                cb('Error: Audio Only!');
            }
        }}).single("files");

        UploadFile(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
              return res.json(err);
            } 
            else if (err) {
              return res.json(err);
            } 
            else {
                next();
            }
        })
    }
}
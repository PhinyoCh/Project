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
                return cb(null,true);
            } else {
                cb('Error: Audio Only!');
            }
        }}).single("files");

        UploadFile(req, res, next, async function (err) {
            if (err instanceof multer.MulterError) {
              return res.status(500).json(err);
            } 
            if (err) {
              return res.status(500).json(err);
            }
            if(req.file != undefined){
                next();
            }
        })
    }
}
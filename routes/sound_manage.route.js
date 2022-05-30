const express = require('express');
const router = express.Router();
const RecordController = require('../controllers/sound.controller');
const validation = require('../middleware/validation.middleware');
const RenderController = require('../controllers/render.controller')
const uploadMiddleware = require('../middleware/upload.middleware');
const multer = require('multer');
const upload = multer({ dest: 'assets/temp/' })

router.get('/', validation.isAuth, RenderController.renderSoundManage);

router.post("/PostUpload", upload.single('sound'), uploadMiddleware.validateFile);

router.post("/PostRemoveSound", validation.isAuth, RecordController.removeFile);

router.post("/searchRecord",RecordController.searchRecord);

module.exports = router;
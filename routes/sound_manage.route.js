const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation.middleware');
const RecordController = require('../controllers/sound.controller');
const RenderController = require('../controllers/render.controller')
const uploadMiddleware = require('../middleware/upload.middleware');
const soundController = require('../controllers/sound.controller');

router.get('/', validation.isAuth, RenderController.renderSoundManage);

router.post("/PostUpload", validation.isAuth,uploadMiddleware.validateUploadFile,soundController.uploadFile);

router.post("/PostRemoveSound", validation.isAuth, RecordController.removeFile);

router.post("/PostEditSound", validation.isAuth, RecordController.editFile);

router.post("/searchRecord", RecordController.searchRecord);

router.get("/playAudio", soundController.getAudioFile)

router.get("/reSentAudio", soundController.getreSentFile)

module.exports = router;
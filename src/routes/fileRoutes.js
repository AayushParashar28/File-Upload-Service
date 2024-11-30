const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const fileController = require('../controllers/fileController');

const router = express.Router();

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/download/:id', fileController.downloadFile);
router.delete('/delete/:id', fileController.deleteFile);

module.exports = router;

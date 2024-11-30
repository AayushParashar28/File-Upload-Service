const File = require('../models/fileModel');
const fs = require('fs');
const path = require('path');

// File upload
exports.uploadFile = async (req, res) => {
  try {
    const { originalname, mimetype, size } = req.file;

    const fileMetadata = new File({
      filename: req.file.filename,
      size,
      mimetype,
    });

    await fileMetadata.save();
    res.status(201).json({ message: 'File uploaded successfully', file: fileMetadata });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// File download
exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const filePath = path.join(__dirname, '../../uploads', file.filename);
    res.download(filePath, file.filename, (err) => {
      if (err) {
        res.status(500).json({ error: 'Error downloading the file' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// File deletion
exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const filePath = path.join(__dirname, '../../uploads', file.filename);

    fs.unlink(filePath, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error deleting the file' });
      }

      await file.remove();
      res.status(200).json({ message: 'File deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
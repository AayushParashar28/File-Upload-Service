const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  size: Number,
  mimetype: String,
  uploadTimestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);

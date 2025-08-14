const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  technologies: [String],
  imageUrl: String,
  codeUrl: String,
  appUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String },
  codeSnippetUrl: { type: String },
  fileExtension: { type: String },
}, {
  timestamps: true  // Automatically create createdAt and updatedAt fields
});

// This will create createdAt and updatedAt fields automatically
module.exports = mongoose.model('Post', postSchema);

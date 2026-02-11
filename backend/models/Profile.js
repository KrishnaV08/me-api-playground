const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  education: String,
  title: String,
  description: String,
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  },
  skills: [String],
  projects: [{
    name: String,
    description: String,
    link: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);

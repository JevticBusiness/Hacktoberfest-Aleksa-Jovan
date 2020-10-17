const mongoose = require('mongoose');

// Data scheme
const posts_scheme = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
<<<<<<< HEAD
  memeImage: { 
    type: String, 
    required: true 
=======
  img_src: {
    data: Buffer,
    contentType: String,
>>>>>>> 0ed9edd9bd4d06183f062f5095ac09fd2a943ce3
  }
});

module.exports = mongoose.model('Post', posts_scheme);
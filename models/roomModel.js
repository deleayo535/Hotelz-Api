const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  price: {
    type: String
  },
  size: {
    type: String,
    required: [true],
    minlength: 8,
    select: false
  },
  Capacity: {
    type: String
  },
  Bed: {
    type: String
  },
  Services: {
    type: String
  }
});

const User = mongoose.model('User', roomSchema);

module.exports = User;

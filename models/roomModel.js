const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide room name!']
  },
  imageCover: {
    type: String,
    required: [true, 'A room must have a cover image']
  },
  price: {
    type: String
  },
  size: {
    type: String
  },
  capacity: {
    type: String
  },
  bed: {
    type: String
  },
  services: {
    type: String
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

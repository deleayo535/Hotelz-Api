const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');

const roomSchema = new mongoose.Schema({
  title: {
    type: String
    // required: [true, 'Please tell us your name!']
  },
  imageCover: {
    type: String,
    required: [true, 'A room must have a cover image']
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

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
roomSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

roomSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

roomSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides'
    //   select: '-__v -passwordChangedAt'
  });

  next();
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

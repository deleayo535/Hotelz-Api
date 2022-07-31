const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.ObjectId,
    ref: 'Room',
    required: [true, 'Booking must belong to a Room!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
  price: {
    type: Number,
    require: [true, 'Booking must have a price.']
  },

  reference: {
    type: String,
    require: [true, 'Booking must have a reference.']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: false
  }
});

bookingSchema.pre(/^find/, function(next) {
  this.populate('user room');
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

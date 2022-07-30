const factory = require('./handlerFactory');
const Booking = require('./../models/bookingModel');

exports.getAllBookings = factory.getAll(Booking);
exports.createBooking = factory.createOne(Booking);

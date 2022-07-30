const factory = require('./handlerFactory');
const Room = require('./../models/roomModel');

exports.getAllRooms = factory.getAll(Room);
exports.getRoom = factory.getOne(Room);
exports.createRoom = factory.createOne(Room);
exports.updateRoom = factory.updateOne(Room);
exports.deleteRoom = factory.deleteOne(Room);

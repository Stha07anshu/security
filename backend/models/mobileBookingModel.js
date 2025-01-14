const mongoose = require('mongoose');
const MobileBookingSchema = new mongoose.Schema({
  pickUpLocation: {
    type: String,
    required: true
  },
  dropOffLocation: {
    type: String,
    required: true
  },
  pickUpDate: {
    type: Date,
    required: true
  },
  dropOffDate: {
    type: Date,
    required: true
  },
  pickUpTime: {
    type: String,
    required: true
  },
  dropOffTime: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  townCity: {
    type: String,
    required: true
  },
  termsAccepted: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MobileBooking', MobileBookingSchema);

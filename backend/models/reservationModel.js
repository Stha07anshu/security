const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    fromAddress: { type: String, required: true },
    toAddress: { type: String, required: true },
    persons: { type: String, required: true },
    luggage: { type: String, required: true },
    journeyDate: { type: Date, required: true },
    journeyTime: { type: String, required: true },
    notes: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }  // Add userId field
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;

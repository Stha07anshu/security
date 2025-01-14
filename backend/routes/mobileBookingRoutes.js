const express = require('express');
const router = express.Router();
const mobileBookingController = require('../controllers/mobileBookingController');
const { authGuard } = require('../middleware/authGuard');

// Create a new mobile booking
router.post('/create', authGuard, mobileBookingController.createMobileBooking);

// Fetch all mobile bookings
router.get('/all_bookings', authGuard, mobileBookingController.getAllMobileBookings);

// Fetch a single mobile booking by ID
router.get('/single_booking/:id', authGuard, mobileBookingController.getMobileBooking);

// Update a mobile booking by ID
router.put('/update_booking/:id', authGuard, mobileBookingController.updateMobileBooking);

// Delete a mobile booking by ID
router.delete('/delete_booking/:id', authGuard, mobileBookingController.deleteMobileBooking);

module.exports = router;

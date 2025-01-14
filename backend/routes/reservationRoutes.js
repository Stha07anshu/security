const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { authGuard } = require('../middleware/authGuard');

// Create a new reservation
router.post('/create', authGuard, reservationController.createReservation);

// Fetch all reservations (can be restricted based on user role or requirements)
router.get('/all_reservations', authGuard, reservationController.getAllReservations);

// Fetch a single reservation by ID (requires authentication to ensure access control)
router.get('/single_reservations', authGuard, reservationController.getReservation);

// Update a reservation (requires authentication to ensure the user can only update their own reservations)
router.put('/update_reservations/:id', authGuard, reservationController.updateReservation);

// Delete a reservation (requires authentication to ensure the user can only delete their own reservations)
router.delete('/delete_reservations/:id', authGuard, reservationController.deleteReservation);

module.exports = router;

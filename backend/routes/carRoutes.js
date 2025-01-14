const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { authGuard } = require('../middleware/authGuard');

router.post('/book',authGuard, carController.bookCar);
router.get('/all_bookings', carController.getAllBookings);
router.get('/single_bookings',authGuard, carController.getSingleBooking);
router.put('/update_bookings/:id', carController.updateBooking);
router.delete('/delete_bookings/:id', carController.deleteBooking);

module.exports = router;
 

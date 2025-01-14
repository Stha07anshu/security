// controllers/mobileBookingController.js
const { validationResult } = require('express-validator');
const MobileBooking = require('../models/mobileBookingModel');

// Create a new mobile booking
const createMobileBooking = async (req, res) => {
  const { pickUpLocation, dropOffLocation, pickUpDate, dropOffDate, pickUpTime, dropOffTime, name, address, phoneNumber, townCity, termsAccepted } = req.body;
  const userId = req.user.id;  // Retrieve userId from request

  if (!pickUpLocation || !dropOffLocation || !pickUpDate || !dropOffDate || !pickUpTime || !dropOffTime || !name || !address || !phoneNumber || !townCity) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const newMobileBooking = new MobileBooking({
      pickUpLocation,
      dropOffLocation,
      pickUpDate,
      dropOffDate,
      pickUpTime,
      dropOffTime,
      name,
      address,
      phoneNumber,
      townCity,
      termsAccepted,
      userId  // Add userId to mobile booking
    });

    const mobileBooking = await newMobileBooking.save();

    res.status(201).json({
      success: true,
      message: "Mobile Booking Created!",
      data: mobileBooking
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Fetch all mobile bookings
const getAllMobileBookings = async (req, res) => {
  try {
    const mobileBookings = await MobileBooking.find({});
    res.status(200).json({
      success: true,
      message: "Mobile Bookings fetched successfully!",
      mobileBookings: mobileBookings
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Fetch a single mobile booking by ID
const getMobileBooking = async (req, res) => {
  const mobileBookingId = req.params.id;
  const userId = req.user.id;  // Retrieve userId from request

  try {
    console.log('Fetching mobile booking with ID:', mobileBookingId);
    console.log('User ID:', userId);

    const mobileBooking = await MobileBooking.findOne({ _id: mobileBookingId, userId: userId });

    if (!mobileBooking) {
      return res.status(404).json({
        success: false,
        message: 'Mobile booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Mobile booking fetched!',
      mobileBooking: mobileBooking
    });
  } catch (error) {
    console.error('Error fetching mobile booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error!',
      error: error.message
    });
  }
};

// Delete a mobile booking
const deleteMobileBooking = async (req, res) => {
  const mobileBookingId = req.params.id;
  const userId = req.user.id;  // Retrieve userId from request

  try {
    const result = await MobileBooking.deleteOne({ _id: mobileBookingId, userId: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Mobile booking not found or not authorized"
      });
    }

    res.status(200).json({
      success: true,
      message: "Mobile booking deleted!"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Update a mobile booking
const updateMobileBooking = async (req, res) => {
  const mobileBookingId = req.params.id;
  const userId = req.user.id;  // Retrieve userId from request

  try {
    const updatedMobileBooking = await MobileBooking.findOneAndUpdate(
      { _id: mobileBookingId, userId: userId },
      req.body,
      { new: true }
    );

    if (!updatedMobileBooking) {
      return res.status(404).json({
        success: false,
        message: "Mobile booking not found or not authorized"
      });
    }

    res.status(200).json({
      success: true,
      message: "Mobile booking updated!",
      updatedMobileBooking
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = {
  createMobileBooking,
  getAllMobileBookings,
  getMobileBooking,
  deleteMobileBooking,
  updateMobileBooking
};

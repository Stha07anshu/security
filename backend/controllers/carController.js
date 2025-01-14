const path = require('path');
const Car = require('../models/carModel');
const availableCars = require('../models/availableCars');

const bookCar = async (req, res) => {
    console.log("Booking api hit");
    const { fromAddress, toAddress, journeyDate, journeyTime, carType } = req.body;

    if (!fromAddress || !toAddress || !journeyDate || !journeyTime || !carType) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const availableCar = availableCars.find(car => car.type === carType && car.available);

    if (!availableCar) {
        return res.status(400).json({
            success: false,
            message: 'No available cars of the requested type',
        });
    }
    

    const newCarRequest = new Car({ 
        fromAddress, toAddress, journeyDate, journeyTime, carType,
        userId : req.user.id
    });

    try {
        const carRequest = await newCarRequest.save();

        res.status(201).json({
            success: true,
            message: "Car request created!",
            data: carRequest
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

const getAllBookings = async (req, res) => {
    try {
        
        const bookings = await Car.find();
        res.status(200).json({
            success: true,
            message: "All bookings fetched successfully",
            data: bookings
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

const getSingleBooking = async (req, res) => {

    try {
        const booking = await Car.find({userId : req.user.id});

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking fetched successfully",
            data: booking
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


const updateBooking = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedBooking = await Car.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: updatedBooking
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

const deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBooking = await Car.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
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

module.exports = {
    bookCar,
    getAllBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking
};

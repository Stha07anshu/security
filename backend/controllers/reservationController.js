const Reservation = require('../models/reservationModel');
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Create a new reservation
const createReservation = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, fromAddress, toAddress, persons, luggage, journeyDate, journeyTime, notes } = req.body;
    const userId = req.user.id;  // Retrieve userId from request

    if (!firstName || !lastName || !email || !phoneNumber || !fromAddress || !toAddress || !persons || !luggage || !journeyDate || !journeyTime) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const newReservation = new Reservation({
            firstName,
            lastName,
            email,
            phoneNumber,
            fromAddress,
            toAddress,
            persons,
            luggage,
            journeyDate,
            journeyTime,
            notes,
            userId  // Add userId to reservation
        });

        const reservation = await newReservation.save();

        // Send email notification
        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reservation Confirmation',
            html: `
        <html>
            <body style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.6;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #007BFF;">Reservation Confirmation</h2>
                    <p>Dear ${firstName} ${lastName},</p>
                    <p>Thank you for choosing our service. We are pleased to confirm your reservation with the following details:</p>
                    <ul style="list-style: none; padding: 0;">
                        <li><strong>From:</strong> ${fromAddress}</li>
                        <li><strong>To:</strong> ${toAddress}</li>
                        <li><strong>Date:</strong> ${journeyDate}</li>
                        <li><strong>Time:</strong> ${journeyTime}</li>
                        <li><strong>Persons:</strong> ${persons}</li>
                        <li><strong>Luggage:</strong> ${luggage}</li>
                        <li><strong>Notes:</strong> ${notes || 'N/A'}</li>
                    </ul>
                    <p>If you have any questions or need further assistance, please do not hesitate to contact us.</p>
                    <p>Thank you for your reservation, and we look forward to serving you.</p>
                    <footer style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
                        <p style="font-size: 0.9em; color: #666;">Best regards,</p>
                        <p style="font-size: 0.9em; color: #666;">The GadiKaa! Team</p>
                    </footer>
                </div>
            </body>
        </html>`
        };

        await transporter.sendMail(mailOptions);


        res.status(201).json({
            success: true,
            message: "Reservation Created!",
            data: reservation
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

// Fetch all reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({});
        res.status(200).json({
            success: true,
            message: "Reservations fetched successfully!",
            reservations: reservations
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

// Fetch a single reservation by ID
const getReservation = async (req, res) => {
    const reservationId = req.params.id;
    const userId = req.user.id;  // Retrieve userId from request

    try {
        console.log('Fetching reservation with ID:', reservationId);
        console.log('User ID:', userId);

        const reservation = await Reservation.findOne({ _id: reservationId, userId: userId });

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Reservation Fetched!',
            reservation: reservation
        });
    } catch (error) {
        console.error('Error fetching reservation:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error!',
            error: error.message
        });
    }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
    const reservationId = req.params.id;
    const userId = req.user.id;  // Retrieve userId from request

    try {
        const result = await Reservation.deleteOne({ _id: reservationId, userId: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found or not authorized"
            });
        }

        res.status(200).json({
            success: true,
            message: "Reservation Deleted!"
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

// Update a reservation
const updateReservation = async (req, res) => {
    const reservationId = req.params.id;
    const userId = req.user.id;  // Retrieve userId from request

    try {
        const updatedReservation = await Reservation.findOneAndUpdate(
            { _id: reservationId, userId: userId },
            req.body,
            { new: true }
        );

        if (!updatedReservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found or not authorized"
            });
        }

        res.status(200).json({
            success: true,
            message: "Reservation Updated!",
            updatedReservation
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
    createReservation,
    getAllReservations,
    getReservation,
    deleteReservation,
    updateReservation
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BookingPage.css'; // Optional: Custom CSS for styling
import { Navbar } from 'reactstrap';

const BookingsPageAdmin = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/car/all_bookings", {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                      'Content-Type': 'application/json'
                    }
                  });
                console.log(response.data); // Log response to check structure
                if (response.data.success) {
                    setBookings(response.data.data);
                } else {
                    setError('Failed to fetch bookings');
                }
                setLoading(false);
            } catch (err) {
                console.error(err); // Log full error
                setError('Failed to fetch bookings');
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <>
        <Navbar/>
        <div className="bookings-page">
            <h1>Your Bookings</h1>
            
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <div className="bookings-list">
                    {bookings.length === 0 ? (
                        <p>No bookings found.</p>
                    ) : (
                        bookings.map((booking) => (
                            <div key={booking._id} className="booking-card">
                                <h3>Booking ID: {booking._id}</h3>
                                <p><strong>From Address:</strong> {booking.fromAddress}</p>
                                <p><strong>To Address:</strong> {booking.toAddress}</p>
                                <p><strong>Journey Date:</strong> {new Date(booking.journeyDate).toLocaleDateString()}</p>
                                <p><strong>Journey Time:</strong> {booking.journeyTime}</p>
                                <p><strong>Car Type:</strong> {booking.carType}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
        </>
    );
};

export default BookingsPageAdmin;

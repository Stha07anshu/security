import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BookingPage.css'; // Optional: Custom CSS for styling
import { Navbar } from 'reactstrap';
import { updateBooking, deleteBooking } from '../../api/Api'; // Import the update and delete functions

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null); // For update functionality
    const [popupVisible, setPopupVisible] = useState(false); // For controlling the visibility of the popup

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("https://localhost:5000/api/car/single_bookings", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.success) {
                    setBookings(response.data.data);
                } else {
                    setError('Failed to fetch bookings');
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch bookings');
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await updateBooking(id, updatedData);
            if (response.data.success) {
                setBookings(bookings.map(booking =>
                    booking._id === id ? { ...booking, ...updatedData } : booking
                ));
                alert('Booking updated successfully!');
            } else {
                alert('Failed to update booking');
            }
        } catch (err) {
            console.error(err);
            alert('Error updating booking');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteBooking(id);
            if (response.data.success) {
                setBookings(bookings.filter(booking => booking._id !== id));
                alert('Booking deleted successfully!');
            } else {
                alert('Failed to delete booking');
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting booking');
        }
    };

    const handleEditClick = (booking) => {
        setSelectedBooking(booking);
        setPopupVisible(true);
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
        setSelectedBooking(null);
    };

    const handlePopupUpdate = async (updatedData) => {
        if (selectedBooking) {
            await handleUpdate(selectedBooking._id, updatedData);
            handlePopupClose();
        }
    };

    return (
        <>
            <Navbar />
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
                                    <button className="update" onClick={() => handleEditClick(booking)}>Update</button>
                                    <button className="delete" onClick={() => handleDelete(booking._id)}>Delete</button>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {popupVisible && selectedBooking && (
                    <div className="update-popup">
                        <h2>Update Booking</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const updatedData = {
                                fromAddress: e.target.fromAddress.value,
                                toAddress: e.target.toAddress.value,
                                journeyDate: e.target.journeyDate.value,
                                journeyTime: e.target.journeyTime.value,
                                carType: e.target.carType.value
                            };
                            handlePopupUpdate(updatedData);
                        }}>
                            <label>
                                From Address:
                                <input type="text" name="fromAddress" defaultValue={selectedBooking.fromAddress} required />
                            </label>
                            <label>
                                To Address:
                                <input type="text" name="toAddress" defaultValue={selectedBooking.toAddress} required />
                            </label>
                            <label>
                                Journey Date:
                                <input type="date" name="journeyDate" defaultValue={selectedBooking.journeyDate.substring(0, 10)} required />
                            </label>
                            <label>
                                Journey Time:
                                <input type="time" name="journeyTime" defaultValue={selectedBooking.journeyTime} required />
                            </label>
                            <label>
                                Car Type:
                                <select
                                    name="carType"
                                    defaultValue={selectedBooking.carType}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select Vehicle Type</option>
                                    <option value="SUV">SUV</option>
                                    <option value="PickUpTruck">Pick Up Truck</option>
                                    <option value="4wd">4WD</option>
                                    <option value="Hatchback">HatchBack</option>
                                    <option value="Sedan">Sedan</option>
                                </select>
                            </label>
                            <button type="submit" className="update">Update</button>
                            <button type="button" className="delete" onClick={handlePopupClose}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default BookingsPage;

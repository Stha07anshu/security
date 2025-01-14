import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/show-reservation.css'; // Custom CSS for styling
import { Navbar } from 'reactstrap';

const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/reservations/all_reservations", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data); // Log response to check structure
                if (response.data.success) {
                    setReservations(response.data.reservations);
                } else {
                    setError('Failed to fetch reservations');
                }
                setLoading(false);
            } catch (err) {
                console.error(err); // Log full error
                setError('Failed to fetch reservations');
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    return (
        <>
        <Navbar />
        <div className="reservations-page">
            <h1>Your Reservations</h1>
            
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <div className="reservations-list">
                    {reservations.length === 0 ? (
                        <p className="no-reservations">No reservations found.</p>
                    ) : (
                        reservations.map((reservation) => (
                            <div key={reservation._id} className="reservation-card">
                                <h3>Reservation ID: {reservation._id}</h3>
                                <p><strong>First Name:</strong> {reservation.firstName}</p>
                                <p><strong>Last Name:</strong> {reservation.lastName}</p>
                                <p><strong>Email:</strong> {reservation.email}</p>
                                <p><strong>Phone Number:</strong> {reservation.phoneNumber}</p>
                                <p><strong>From Address:</strong> {reservation.fromAddress}</p>
                                <p><strong>To Address:</strong> {reservation.toAddress}</p>
                                <p><strong>Journey Date:</strong> {new Date(reservation.journeyDate).toLocaleDateString()}</p>
                                <p><strong>Journey Time:</strong> {reservation.journeyTime}</p>
                                <p><strong>Persons:</strong> {reservation.persons}</p>
                                <p><strong>Luggage:</strong> {reservation.luggage}</p>
                                <p><strong>Notes:</strong> {reservation.notes}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
        </>
    );
};

export default ReservationsPage;

import React, { useState } from 'react';
import Sidebar from '../ui/Slider';
import ProfileDetails from '../ui/ProfileDetail';
import BookingsPage from '../ui/BookingPage'; // Import the BookingsPage component
import ShowReservation from '../ui/ShowReservation'; 
import '../styles/Profile.css';
import Homepage from './Homepage';

const ProfilePage = () => {
    const [selectedMenu, setSelectedMenu] = useState('Profile');

    const menuItems = [
        { name: 'Profile', icon: 'person' },
        { name: 'My Booking', icon: 'book' },
        { name: 'My Reservation', icon: 'bell' },
        { name: 'Back', icon: 'box-arrow-right' }
    ];

    const handleMenuItemClick = (item) => {
        setSelectedMenu(item.name);
    };

    return (
        <div className="profile-page d-flex">
            <Sidebar menuItems={menuItems} onMenuItemClick={handleMenuItemClick} />
            <div className="profile-content">
                {selectedMenu === 'Profile' && <ProfileDetails selectedMenu={selectedMenu} />}
                {selectedMenu === 'My Booking' && <BookingsPage />}
                {selectedMenu === 'My Reservation' && <ShowReservation />}
                {selectedMenu === 'Back' && <Homepage />}
                {/* Add other components based on selectedMenu if needed */}
            </div>
        </div>
    );
};

export default ProfilePage;

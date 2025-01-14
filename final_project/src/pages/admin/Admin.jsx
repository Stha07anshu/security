import React, { useState } from 'react';
import Sidebar from '../ui/Slider';
import AdminDashboard from '../admin/AdminDashboard';
import '../styles/Profile.css';
import ContactsList from '../ui/ContactList';
import BookingsPageAdmin from './BookingPageAdmin';
import ShowReservation from '../ui/ShowReservation'; 
import Homepage from '../homepage/Homepage';

const AdminPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('Admin');

    const menuItems = [
        { name: 'Admin', icon: 'person' },
        { name: 'Booking', icon: 'book' },
        { name: 'Reservation', icon: 'book' },
        { name: 'Contact List', icon: 'phone' },
        { name: 'Back', icon: 'back' }
    ];

    const handleMenuItemClick = (item) => {
        setSelectedMenu(item.name);
    };

    return (
        <div className="profile-page d-flex">
            <Sidebar menuItems={menuItems} onMenuItemClick={handleMenuItemClick} />
            <div className="profile-content">
                {selectedMenu === 'Admin' && <AdminDashboard selectedMenu={selectedMenu} />}
                {selectedMenu === 'Booking' && <BookingsPageAdmin />}
                {selectedMenu === 'Reservation' && <ShowReservation />}
                {selectedMenu === 'Contact List' && <ContactsList />}
                {selectedMenu === 'Back' && <Homepage />}
                {/* Add other components based on selectedMenu if needed */}
            </div>
        </div>
    );
};

export default AdminPage;

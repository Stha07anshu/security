import React, { useState, useEffect } from 'react';
import '../styles/ProfileDetail.css';

const ProfileDetails = ({ selectedMenu }) => {
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.firstName) {
            setUser({
                ...userData,
                firstName: capitalizeFirstLetter(userData.firstName),
                lastName: capitalizeFirstLetter(userData.lastName)
            });
            setUserFirstName(capitalizeFirstLetter(userData.firstName));
            setUserLastName(capitalizeFirstLetter(userData.lastName));
        }
    }, []);

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        try {
            localStorage.setItem('user', JSON.stringify(user)); // Update localStorage
            setMessage('Profile updated successfully');
        } catch (error) {
            setMessage('Error updating profile');
            console.error('Error updating profile:', error);
        }
    };

    const profileInfo = {
        name: `${userFirstName} ${userLastName}`,
        description: `Hello ${userFirstName}, We are your affordable and reliable car rental companion in Nepal, offering a seamless and cost-effective way to explore the beautiful landscapes of the country.`
    };

    return (
        <div className="profile-details">
            <h2>{selectedMenu}</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{profileInfo.name}</h5>
                    <p className="card-text">{profileInfo.description}</p>
                </div>
            </div>
            
            {/* New Card for Profile Form */}
            <div className="card profile shadow mt-4">
                <div className="card-body">
                    <h2 className="mb-4">Profile Detail</h2>
                    {message && <p className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>{message}</p>}
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={user.firstName || ''}
                                onChange={(e) => setUser({ ...user, firstName: capitalizeFirstLetter(e.target.value) })}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={user.lastName || ''}
                                onChange={(e) => setUser({ ...user, lastName: capitalizeFirstLetter(e.target.value) })}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email || ''}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="form-control"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;

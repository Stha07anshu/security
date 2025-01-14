// src/components/ContactsList.js
import React, { useState, useEffect } from 'react';
import { getAllContacts } from '../../api/Api';
import '../styles/contact-list.css'; // Import the CSS file
import { Navbar } from 'reactstrap';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getAllContacts();
        setContacts(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p className="loading">Loading contacts...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <>
    <Navbar/>
    <div className="contacts-container">
      <div className="contacts-header">
        <h2>Contacts List</h2>
      </div>
      {contacts.length === 0 ? (
        <p className="loading">No contacts found</p>
      ) : (
        <ul className="contacts-list">
          {contacts.map((contact) => (
            <li key={contact._id}>
              <p><strong>Name:</strong> {contact.name}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Message:</strong> {contact.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default ContactsList;

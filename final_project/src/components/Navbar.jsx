import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchProducts } from '../api/Api'; // Import the searchProducts function
import './Navbar.css'; // Import custom CSS

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Get user data
  const user = JSON.parse(localStorage.getItem('user'));

  // Log out function
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      // Optionally show a message or just return if the search query is empty
      console.error('Search query cannot be empty');
      return;
    }
    try {
      const response = await searchProducts(searchQuery);
      console.log(response.data.products); // Handle the response data as needed
      navigate('/search-results', { state: { products: response.data.products } });
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <nav className="navbar navbar-light bg-light-custom fixed-top p-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ fontSize: '30px', fontWeight: 'bold' }}>
          <i className="fas fa-car" style={{ marginRight: '10px' }}></i> CarMart
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLightNavbar" aria-controls="offcanvasLightNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-light" tabIndex="-1" id="offcanvasLightNavbar" aria-labelledby="offcanvasLightNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasLightNavbarLabel" style={{ fontWeight: 'bold', fontFamily: 'Times New Roman, Times, serif' }}>Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/" style={{ fontWeight: 'bold' }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cars" style={{ fontWeight: 'bold' }}>Cars</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about" style={{ fontWeight: 'bold' }}>About us</Link>
              </li>
              {user && user.isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin" style={{ fontWeight: 'bold' }}>Admin Dashboard</Link>
                </li>
              )}
              {user ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontWeight: 'bold' }}>
                    Welcome, {capitalizeFirstLetter(user.firstName)}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-light">
                    <li><Link className="dropdown-item" to="/profile" style={{ fontWeight: 'bold' }}>Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={handleLogout} style={{ fontWeight: 'bold' }}>Log out</button></li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" style={{ fontWeight: 'bold' }}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register" style={{ fontWeight: 'bold' }}>Register</Link>
                  </li>
                </>
              )}
            </ul>
            <form className="d-flex mt-3" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button className="btn btn-success" type="submit" style={{ fontWeight: 'bold' }}>Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

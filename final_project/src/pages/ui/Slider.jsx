// src/ui/Sidebar.js

import React from 'react';
import '../styles/Slider.css';

const Sidebar = ({ menuItems, onMenuItemClick }) => {
    return (
        <div className="sidebar">
            {menuItems.map((item) => (
                <div
                    key={item.name}
                    className="sidebar-link"
                    onClick={() => onMenuItemClick(item)}
                >
                    <i className={`fas fa-${item.icon}`}></i>
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;

// components/VendorDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './VendorDashboard.css'; // Import the CSS file for styling

const VendorDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Memoize handleLogout using useCallback
    const handleLogout = useCallback(() => {
        // Clear user data
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        // Redirect to login page
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = ''; // Required for Chrome to show the alert
        };

        const handlePopState = (e) => {
            e.preventDefault();
            const confirmed = window.confirm("Are you sure you want to leave? Your session will be logged out.");
            if (confirmed) {
                handleLogout();
                navigate('/login', { replace: true }); // Navigate to login page
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        // Cleanup function
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [handleLogout, navigate]);

    // Handle dropdown toggle
    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    // Navigate to dashboard page
    const navigateToDashboard = () => {
        navigate('/vendor-dashboard');
    };

    return (
        <div className='App'>
            <header className='header'>
                <button className='title' onClick={navigateToDashboard}>
                    Vendor Dashboard
                </button>
                <div className='navbar'>
                    <button className='dropdown-toggle' onClick={handleDropdownToggle}>
                        &#9776; {/* Hamburger menu icon */}
                    </button>
                    {isOpen && (
                        <div className='dropdown-menu'>
                            <a href='#product'>Product</a>
                            <a href='#vendor-details'>Vendor Details</a>
                            <a href='#inventory'>Inventory</a>
                            <a href='#order'>Order</a>
                            <button className='logout-button' onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>
            {/* <main>
                <h1>Vendor Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
            </main> */}
        </div>
    );
};

export default VendorDashboard;

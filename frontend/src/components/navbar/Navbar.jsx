import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import EVOLIFE from "./../../assets/EVOLIFE.png";
import "./style.css";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const response = await fetch("http://localhost:5000/", {
                method: "GET",
                credentials: "include"
            });
            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Error fetching current user:", error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/logout", {
                method: "POST",
                credentials: "include"
            });
            if (response.ok) {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className='nav'>
            <div className='container'>
                <div className='header-line'>
                    <div className='header-logo'>
                        <img src={EVOLIFE} alt=""/>
                    </div>

                    <div className='navigation'>
                        {isLoggedIn ? (
                            <>
                                {/* Use Link component instead of anchor tag */}
                                <Link to='/app' className='bthLogin-popup1'>App</Link>
                                <a className='nav-item' href="#about-section">About</a>
                                <a className='nav-item' href="#service-section">Services</a>
                                <a className="bthLogin-popup" onClick={handleLogout}>Logout</a>
                            </>
                        ) : (
                            <>
                                <a className='nav-item' href="#about-section">About</a>
                                <a className='nav-item' href="#service-section">Services</a>  
                                <a className='bthLogin-popup' href='/login'>Login</a>      
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar
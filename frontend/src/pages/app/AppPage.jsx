import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MenuComponent from '../../components/app/Menu';
import SinusoidalLines from '../../dynamic/SinusoidalLines';
import Home from './Home';
import Database from './Database';
import Products from './Products';
import Diary from './Diary';
import Settings from './Settings';
import Community from './Community';
import Feedback_page from './Feedback_page';
import './styles.css';

const AppPage = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light') {
            setIsDarkTheme(false);
            document.documentElement.classList.add('light-theme');
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkTheme) {
            document.documentElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <div className="app-page-container">
            <SinusoidalLines />
            <MenuComponent toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <div className="content-container">
                <Routes>
                    <Route path="/" element={<Navigate to="home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/database" element={<Database />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/diary" element={<Diary />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/settings" element={<Settings toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />} />
                    <Route path="/feedback" element={<Feedback_page />} />
                </Routes>
            </div>
        </div>
    );
};

export default AppPage;

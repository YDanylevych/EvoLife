import React, { useState, useEffect } from 'react';
import { Input, Button, Switch, message } from 'antd';
import axios from 'axios';
import './styles.css';

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState('profile');
  const [newUsername, setNewUsername] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [switchChecked, setSwitchChecked] = useState(false);

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

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const saveUsernameChange = async () => {
    try {
      const response = await axios.put('http://localhost:5000/change-username', {
        username: newUsername,
      }, {
        withCredentials: true,
      });

      if (response.data.success) {
        message.success('Username changed successfully');
      } else {
        message.error(response.data.error || 'Failed to change username');
      }
    } catch (error) {
      message.error('An error occurred while changing username');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/delete-account', {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        message.success('Account deleted successfully');
        window.location.href = '/';
      } else {
        message.error('Failed to delete account');
      }
    } catch (error) {
      message.error('An error occurred while deleting account');
    }
  };

  return (
    <div className="settings-container">
      <div className="side-menu">
        <div className="options-column">
          <div
            className={`menu-option ${selectedOption === 'profile' ? 'selected' : ''}`}
            onClick={() => setSelectedOption('profile')}
          >
            Profile
          </div>
          <div
            className={`menu-option ${selectedOption === 'appearance' ? 'selected' : ''}`}
            onClick={() => setSelectedOption('appearance')}
          >
            Appearance
          </div>
          <div
            className={`menu-option ${selectedOption === 'account' ? 'selected' : ''}`}
            onClick={() => setSelectedOption('account')}
          >
            Account
          </div>
        </div>

        <div className="features-column">
          {selectedOption === 'profile' && (
            <div className="settings-option">
              <h2 style={{ marginBottom: '10px' }}>Profile</h2>
              <p style={{ marginBottom: '10px' }}>Change username:</p>
              <Input
                placeholder="Enter new username"
                value={newUsername}
                onChange={handleUsernameChange}
                style={{ marginBottom: '10px' }}
              />
              <Button
                type="primary"
                onClick={saveUsernameChange}
                className="change-username-button"
              >
                Save Username
              </Button>
            </div>
          )}

          {selectedOption === 'appearance' && (
            <div className="settings-option">
              <h2 style={{ marginBottom: '10px' }}>Appearance</h2>
              <p style={{ marginBottom: '10px' }}>Change theme:</p>
                <Switch
                className="custom-switch"
                checked={isDarkTheme}
                onChange={toggleTheme}
                defaultChecked
                style={{
                    backgroundColor: isDarkTheme ? '#33d6c4' : '#707070',
                }}
                />
            </div>
          )}

          {selectedOption === 'account' && (
            <div className="settings-option">
              <h2 style={{ marginBottom: '10px' }}>Account</h2>
              <Button
                type="danger"
                onClick={handleDeleteAccount}
                className="delete-button"
                style={{ marginBottom: '10px' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  Delete Account
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
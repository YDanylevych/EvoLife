import React, { useState, useEffect } from 'react';
import httpClient from '../../additional/httpClient';
import "./style.css";
import crossImage from "./../../assets/cross.png";

const Register = () => {
  
  useEffect(() => {
    const initializeRegister = () => {
      const registerWrapper = document.querySelector('.register-wrapper');
      const loginLink = document.querySelector('.login-link');
      const bthPopups = document.querySelectorAll('.bth');
      const iconClose = document.querySelector('.icon-close');

      const handleRegisterClick = () => {
        registerWrapper && registerWrapper.classList.add('active');
      };

      const handleCloseClick = () => {
        registerWrapper && registerWrapper.classList.remove('active');
      };

      // Automatically trigger popup if registerWrapper is available
      registerWrapper && handleRegisterClick();

      // Attach event listeners if elements are available
      loginLink && loginLink.addEventListener('click', handleCloseClick);
      bthPopups.forEach(button => {
        button.addEventListener('click', handleRegisterClick);
      });
      iconClose && iconClose.addEventListener('click', handleCloseClick);

      // Cleanup event listeners on component unmount
      return () => {
        loginLink && loginLink.removeEventListener('click', handleCloseClick);
        bthPopups.forEach(button => {
          button.removeEventListener('click', handleRegisterClick);
        });
        iconClose && iconClose.removeEventListener('click', handleCloseClick);
      };
    };

    if (document.readyState === 'complete') {
      initializeRegister();
    } else {
      window.addEventListener('load', initializeRegister);
    }
  }, []);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const resp = await httpClient.post("http://localhost:5000/register", {
        username,
        email,
        password,
      });

      window.location.href = "/app";
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("User already exists");
      } else {
        alert("An error occurred while registering");
      }
    }
  };

  return (
    <>
        <div className = "gradient-background">
            <div className="register-wrapper wrapper">
                <span className="icon-close">
                    <img src={crossImage} alt="Close" />
                </span>
                <div className="form-box register">
                    <h2>Registration</h2>
                    <form action="#">
                        <div className="input-box">
                        <span className="icon">
                            <ion-icon name="person"></ion-icon>
                        </span>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id=""
                        />

                        <label>Username</label>
                        </div>
                        <div className="input-box">
                        <span className="icon">
                            <ion-icon name="mail"></ion-icon>
                        </span>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id=""
                        />
                        <label>Email</label>
                        </div>
                        <div className="input-box">
                        <span className="icon">
                            <ion-icon name="lock-closed"></ion-icon>
                        </span>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id=""
                        />
                        <label>Password</label>
                        </div>
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" required />
                                I agree to the terms & conditions
                            </label>
                        </div>
                        <button type="button" onClick={() => registerUser()} className="bth">
                        Register
                        </button>
                        <div className="login-register">
                            <p>
                                Already have an account?{' '}
                                <a href="/login">
                                Login
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  );
};

export default Register;

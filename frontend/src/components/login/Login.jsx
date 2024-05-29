import "./style.css";
import crossImage from "./../../assets/cross.png";
import React, { useState } from "react";
import httpClient from "../../additional/httpClient";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const logInUser = async () => {
      console.log(email, password);
  
      try {
        const resp = await httpClient.post("http://localhost:5000/login", {
          email,
          password,
        });
  
        window.location.href = "/app";
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials");
        } else {
          alert("An error occurred while logging in");
        }
      }
    };

    

    return (
        <>
            <div className = "gradient-background">
                <div className="wrapper">
                    <span className="icon-close">
                        <img src={crossImage} alt="Close" />
                    </span>
                    <div className="form-box login">
                        <h2>Login</h2>
                        <form action="#">
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
                            {/*<div className="remember-forgot">
                                <label><input type="checkbox" required/>
                                    Remember me</label>
                                <a href="#">Forgot Password?</a>
                            </div>*/}
                            <button type="button" className="bth" onClick={() => logInUser()}>Login</button>
                            <div className="login-register">
                                <p>Don't have an account? <a href="/register">Register</a></p>
                            </div>
                        </form>
                    </div>
                    
                </div> 
            </div>    
        </>
    );
  };

  
  
  export default Login;
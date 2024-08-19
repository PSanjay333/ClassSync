import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const PrincipalLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); 
  const navigate = useNavigate();

  const loginHandle = async (e) => {
    e.preventDefault(); 

    
    setAlertMessage("");
    setAlertType("");

    try {
      const response = await axios.post("https://classsync-backend.onrender.com/principal_login", {
        email,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); 
        setAlertMessage("Login successful!");
        setAlertType("success");
        setTimeout(() => navigate("/Principal_dashboard"), 1000); 
      }
    } catch (error) {
      if (error.response) {
        setAlertMessage(error.response.data.message || "Invalid credentials");
        setAlertType("danger");
      } else {
        setAlertMessage("Network error. Please try again.");
        setAlertType("danger");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <main className="form-signin w-50">
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}
        <form onSubmit={loginHandle}>
          <h1 className="h3 mb-3 fw-normal">Principal Login</h1>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-dark w-100 py-2 mt-2" type="submit">
            Sign in
          </button>
          <div className="mt-4">
            <div className="d-flex flex-column flex-md-row justify-content-around">
              <a href="/teacher_signup" className="btn btn-light mb-2 mb-md-0">Register Teacher?</a>
              <a href="/student_signup" className="btn btn-light mb-2 mb-md-0">Register Student?</a>
              <button 
                className="btn btn-light" 
                onClick={() => navigate("/logins")} 
              >
                Go back
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PrincipalLogin;

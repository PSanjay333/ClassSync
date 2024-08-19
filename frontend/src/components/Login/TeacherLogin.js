import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setAlertMessage("");
    setAlertType("");

    try {
      const response = await axios.post('http://localhost:5000/teacher_login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, teacherId, message } = response.data;

        console.log("teacher id in login:",teacherId)
        console.log(message); 

        
        localStorage.setItem('token', token);
        localStorage.setItem('teacherId', teacherId);

        
        setAlertMessage(message);
        setAlertType('success');
        setTimeout(() => navigate('/Teacher_Dashboard', { state: { teacherId } }), 1000); 
      }
    } catch (error) {
      if (error.response) {
        setAlertMessage(error.response.data.message || 'Invalid credentials');
        setAlertType('danger');
      } else {
        setAlertMessage('Network error. Please try again.');
        setAlertType('danger');
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
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Teacher Login</h1>
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

export default TeacherLogin;

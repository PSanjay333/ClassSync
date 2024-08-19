import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentSignup = () => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage(""); 
    setAlertType(""); 

    
    if (!name || !rollNo || !email || !password || !confirmpassword) {
      setAlertMessage('All fields are required');
      setAlertType('danger');
      return;
    }

    try {
      const response = await axios.post('https://classsync-backend.onrender.com/student_signup', {
        Name: name,
        rollno: rollNo,
        email,
        password,
        confirmpassword
      });

      setAlertMessage(response.data.message);
      setAlertType('success');
      setTimeout(() => navigate('/logins'), 1000); 
    } catch (error) {
      console.error(error);
      if (error.response) {
        setAlertMessage(error.response.data || 'Error during signup');
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
          <h1 className="h3 mb-3 fw-normal">Register the Student</h1>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="floatingName">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingRollNo"
              placeholder="Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
            <label htmlFor="floatingRollNo">Roll Number</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
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
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingConfirmPassword"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
          </div>
          <button className="btn btn-dark w-100 py-2 mt-2" type="submit">
            Register
          </button>
          <div className="d-flex justify-content-around align-items-center m-4">
            <button 
              className="btn btn-light" 
              onClick={() => navigate("/logins")} 
            >
              Go back
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default StudentSignup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherSignup = () => {
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [subject, setSubject] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage(""); 
    setAlertType("");

    if (password !== confirmpassword) {
      setAlertMessage("Passwords do not match");
      setAlertType("danger");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/principal_teacher_signup', {
        name,
        teacherId,
        email,
        password,
        confirmpassword,
        department,
        subject,
      });
      setAlertMessage(response.data.message);
      setAlertType("success");
      setTimeout(() => navigate('/logins'), 1000); 
    } catch (error) {
      if (error.response) {
        setAlertMessage(error.response.data || 'Error during signup');
        setAlertType("danger");
      } else {
        setAlertMessage('Network error. Please try again.');
        setAlertType("danger");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-auto m-5">
      <main className="form-signin w-50">
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-2 fw-normal">Register the Teacher</h1>

          <div className="form-floating mb-1">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="floatingName">Name</label>
          </div>
          
          <div className="form-floating mb-1">
            <input
              type="text"
              className="form-control"
              id="floatingTeacherId"
              placeholder="T12345"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              required
            />
            <label htmlFor="floatingTeacherId">Teacher ID</label>
          </div>
          
          <div className="form-floating mb-1">
            <input
              type="text"
              className="form-control"
              id="floatingDepartment"
              placeholder="Mathematics"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
            <label htmlFor="floatingDepartment">Department</label>
          </div>
          
          <div className="form-floating mb-1">
            <input
              type="text"
              className="form-control"
              id="floatingSubject"
              placeholder="Physics"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <label htmlFor="floatingSubject">Subject</label>
          </div>

          <div className="form-floating mb-1">
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
          <div className="form-floating mb-1">
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
          <div className="form-floating mb-1">
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

export default TeacherSignup;

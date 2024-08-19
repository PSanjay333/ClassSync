import React from "react";
import Header from "./Header";
import './table.css';
const Logins = () => {
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center vh-100 logins">
        <div className="row w-75">
          <div className="col-md-4 mb-3">
            <div className="h-100 p-5 text-bg-dark rounded-3 text-center">
              <h2>Principal Login</h2>
              <p>Login for the Principal</p>
              <a className="btn btn-outline-light" href="/principal_login">
                Login
              </a>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="h-100 p-5 text-bg-dark rounded-3 text-center">
              <h2>Teacher Login</h2>
              <p>Login for the Teacher</p>
              <a className="btn btn-outline-light" href="/teacher_login">
                Login
              </a>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="h-100 p-5 text-bg-dark rounded-3 text-center">
              <h2>Student Login</h2>
              <p>Login for Students</p>
              <a className="btn btn-outline-light" href="/student_login">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logins;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrincipalHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Redirect to login page or any other desired page
    navigate('/principal_login'); // Adjust the path according to your routing setup
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/Principal_dashboard">
            ClassSync.
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                {/* <a className="nav-link" aria-current="page" href="/teachers_list">
                  Teachers List
                </a> */}
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="/students_list">
                  Student List
                </a> */}
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
            <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PrincipalHeader;

import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/logins';

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
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
                {/* Add your nav items here if needed */}
              </li>
            </ul>
            <form className="d-flex" role="search">
              {isLoginPage ? (
                <a className="btn btn-light" href="/">
                  Home
                </a>
              ) : (
                <a className="btn btn-light" href="/logins">
                  Login
                </a>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

import React from "react";
// import Header from "./Header";
import "./Homepage.css"; // Import the CSS file

const Homepage = () => {
  return (
    <div>
      <body className="d-flex vh-100 text-center text-bg-dark">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header className="mb-auto">
            <div>
              <h3 className="float-md-start mb-0">ClassSync.</h3>
            </div>
          </header>

          <main className="m-5 p-5">
            <h1>ClassSync - Full Stack Classroom Management</h1>
            <p className="lead">
              ClassSync is a full-stack app for managing classrooms. Principals
              can create classrooms and manage users, while teachers handle
              timetables and students can view their details. Enjoy a
              streamlined and modern experience.
            </p>

            <p className="lead">
              <a
                href="/logins"
                className="btn btn-lg btn-light fw-bold border-white bg-white"
              >
                Login
              </a>
            </p>
          </main>

          <footer className="mt-auto text-white-50">
            <p>
              ClassSync by{" "}
              <a
                href="https://twitter.com/mdo"
                className="text-white text-decoration-none"
              >
                Sanjay Pothuraju
              </a>
              .
            </p>
          </footer>
        </div>
      </body>
    </div>
  );
};

export default Homepage;

import React from "react";

const Homepage = () => {
  return (
    <div className="d-flex text-center text-bg-dark vh-100 w-100 text-bg-md-danger">
      <div className="cover-container d-flex flex-column w-100 h-100 p-3 mx-auto">
        <header className="mb-auto">
          <h3 className="mb-0">ClassSync.</h3>
        </header>

        <div className="container my-5">
          <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
  
            <h1 className="text-body-emphasis">ClassSync - Full Stack Classroom Management</h1>
            <p className="col-lg-6 mx-auto mb-4">
            ClassSync is a full-stack app for managing classrooms. Principals
            can create classrooms and manage users, while teachers handle
            timetables and students can view their details. Enjoy a
            streamlined and modern experience.
            </p>
            <a className="btn btn-dark px-5 mb-5" type="button" href="/logins">
              Login
            </a>
          </div>
        </div>

        <footer className="mt-auto text-white-50">
          <p>
            ClassSync by{" "}
            <a
              href="https://my-portfolio-sanjay-pothuraju.vercel.app/"
              className="text-white text-decoration-none"
            >
              Sanjay Pothuraju
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;

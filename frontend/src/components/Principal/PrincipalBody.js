import React from "react";

const PrincipalBody = () => {
  return (
    <div className="container-fluid px-4">
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5 text-center">
          <h1 className="display-5 fw-bold" style={{ color: 'black' }}>
            Welcome, Principal
          </h1>
          <p className="col-md-8 mx-auto fs-4">
            Streamline your school's operations—manage teachers, students, and classrooms with ease and efficiency.
          </p>
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4">
            <a
              className="btn btn-dark btn-lg"
              type="button"
              href="/create-class"
            >
              Create Classroom
            </a>
            <a
              className="btn btn-dark btn-lg text-wrap text-truncate"
              type="button"
              href="/assign_students"
            >
              Assign Students to Teacher
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalBody;

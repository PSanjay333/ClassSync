import React from "react";

const PrincipalBody = () => {
  return (
    <div>
      <div class="p-5 mb-4 bg-body-tertiary rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold" style={{ color: 'black' }}>Welcome, Principal</h1>
          <p class="col-md-8 fs-4">Streamline your school's operations—manage teachers, students, and classrooms with ease and efficiency.</p>
          <div className="d-flex flex-column flex-md-row gap-3">
            <a
              className="btn btn-dark btn-lg mb-3 mb-md-0"
              type="button"
              href="/create-class"
            >
              Create Classroom
            </a>
            <a
              className="btn btn-dark btn-lg"
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

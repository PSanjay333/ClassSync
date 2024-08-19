import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentBody = ({ studentId }) => {
  const [teachers, setTeachers] = useState([]);
  const [fellowStudents, setFellowStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching details for studentId:', studentId);
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`https://classsync-backend.onrender.com/student_details/${studentId}`, {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        });
        setTeachers(response.data.teachers);
        setFellowStudents(response.data.fellowStudents);

        const studentResponse = await axios.get(`https://classsync-backend.onrender.com/student/${studentId}`, {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        });
        setStudentName(studentResponse.data.Name);
      } catch (err) {
        setError('Failed to fetch details');
        console.error(err);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  return (
    <div className="container-fluid px-4">
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5 text-center">
          <h1 className="display-5 fw-bold" style={{ color: 'black' }}>
            Welcome, {studentName || 'student'}
          </h1>
          <p className="col-md-8 mx-auto fs-4">
            Streamline your school's operations—manage teachers, students, and classrooms with ease and efficiency.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {teachers.length > 0 && (
        <div className="mb-4">
          <h2>Your Teacher Details</h2>
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index}>
                    <td>{teacher.Name}</td>
                    <td>{teacher.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h2>Your Fellow Students</h2>
        {fellowStudents.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll Number</th>
                </tr>
              </thead>
              <tbody>
                {fellowStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.Name}</td>
                    <td>{student.rollno}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No fellow students found</p>
        )}
      </div>
    </div>
  );
};

export default StudentBody;

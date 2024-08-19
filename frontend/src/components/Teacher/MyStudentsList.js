import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteStudent } from "../Student/studentService";
import "../table.css";

const MyStudentList = ({ teacherId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter((student) => student._id !== id));
      setAlertMessage('Student deleted successfully');
      setAlertType('success');
      setTimeout(() => setAlertMessage(''), 1000);
    } catch (err) {
      setAlertMessage('Failed to delete student');
      setAlertType('danger');
      setTimeout(() => setAlertMessage(''), 1000);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `https://classsync-backend.onrender.com/teacher_students/${teacherId}`,
          {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          }
        );
        setStudents(response.data);
      } catch (err) {
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [teacherId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Your Students List</h2>
      {alertMessage && (
        <div className={`alert alert-${alertType}`} role="alert">
          {alertMessage}
        </div>
      )}
      {students.length === 0 ? (
        <p>No students assigned to this teacher.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Other Details</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.rollno}</td>
                  <td>{student.Name}</td>
                  <td>{student.email}</td>
                  <td>
                    <div className="d-flex justify-content-around align-items-center">
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="btn btn-light me-2"
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-light"
                        onClick={() =>
                          navigate("/update-student", {
                            state: { student },
                          })
                        }
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyStudentList;

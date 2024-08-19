import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "./studentService";
import { useNavigate } from "react-router-dom";
import PrincipalHeader from "../Principal/PrincipalHeader";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        setAlertMessage("Failed to fetch students");
        setAlertType("danger");
        setTimeout(() => {
          setAlertMessage('');
          setAlertType('');
        }, 1000); 
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter((student) => student._id !== id));
      setAlertMessage("Student deleted successfully");
      setAlertType("success");
      setTimeout(() => {
        setAlertMessage('');
        setAlertType('');
      }, 3000); 
    } catch (err) {
      setAlertMessage("Failed to delete student");
      setAlertType("danger");
      setTimeout(() => {
        setAlertMessage('');
        setAlertType('');
      }, 1000); 
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <PrincipalHeader />
      <div className="m-5">
        <h2>Students</h2>

        {/* Bootstrap Alert */}
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Roll no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
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
      </div>
    </div>
  );
};

export default Students;

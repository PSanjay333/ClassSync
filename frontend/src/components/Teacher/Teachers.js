import React, { useEffect, useState } from "react";
import { getTeachers, deleteTeacher } from "./teacherService";
import { useNavigate } from "react-router-dom";
import PrincipalHeader from "../Principal/PrincipalHeader";
import '../table.css'; // Import the CSS file for table styling

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (err) {
        setAlertMessage("Failed to fetch teachers");
        setAlertType("danger");
        setTimeout(() => {
          setAlertMessage('');
          setAlertType('');
        }, 1000); 
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id);
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
      setAlertMessage("Teacher deleted successfully");
      setAlertType("success");
      setTimeout(() => {
        setAlertMessage('');
        setAlertType('');
      },1000); 
    } catch (err) {
      setAlertMessage("Failed to delete teacher");
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
        <h2>Teachers</h2>

        
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Dept</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>{teacher.teacherId}</td>
                  <td>{teacher.Name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.dept}</td>
                  <td>
                    <div className="d-flex justify-content-around align-items-center">
                      <button
                        onClick={() => handleDelete(teacher._id)}
                        className="btn btn-light me-2"
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-light"
                        onClick={() =>
                          navigate("/update-teacher", {
                            state: { teacher },
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

export default Teachers;

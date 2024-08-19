import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignStudents = () => {
  const navigate = useNavigate(); 
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersResponse, studentsResponse] = await Promise.all([
          axios.get('https://classsync-backend.onrender.com/teachers', {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          }),
          axios.get('https://classsync-backend.onrender.com/students', {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          })
        ]);
        setTeachers(teachersResponse.data);
        setStudents(studentsResponse.data);
      } catch (error) {
        setAlertMessage('Error fetching data.');
        setAlertType('danger');
        setTimeout(() => {
          setAlertMessage('');
          setAlertType('');
        }, 1000);
      }
    };

    fetchData();
  }, []);

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
  };

  const handleStudentChange = (e) => {
    const value = e.target.value;
    setSelectedStudents(prevState => 
      prevState.includes(value) ? prevState.filter(id => id !== value) : [...prevState, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage('');
    setAlertType('');
    
    try {
      await axios.post('https://classsync-backend.onrender.com/assign_students_to_teachers', {
        teacher_id: selectedTeacher,
        student_ids: selectedStudents
      },{
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      setAlertMessage('Students assigned to teacher successfully.');
      setAlertType('success');
      setTimeout(() => navigate('/assign_students'), 1000); 
    } catch (error) {
      setAlertMessage(error.response?.data?.message || 'Failed to assign students.');
      setAlertType('danger');
      setTimeout(() => {
        setAlertMessage('');
        setAlertType('');
      }, 1000);
    }
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <main className="form-signin w-75">
        <h2 className="text-center mb-4">Assign Students to Teacher</h2>
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="teacher" className="form-label">Select Teacher</label>
            <select 
              id="teacher" 
              className="form-select" 
              value={selectedTeacher} 
              onChange={handleTeacherChange} 
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Select Students</label>
            {students.map(student => (
              <div key={student._id} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`student-${student._id}`}
                  value={student._id}
                  onChange={handleStudentChange}
                />
                <label className="form-check-label" htmlFor={`student-${student._id}`}>
                  {student.Name}
                </label>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-around">
            <button type="button" className="btn btn-secondary" onClick={handleGoBack}>
              Go Back
            </button>
            <button type="submit" className="btn btn-dark">
              Assign Students
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AssignStudents;

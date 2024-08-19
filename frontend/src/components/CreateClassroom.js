import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateClassroom = () => {
  const navigate = useNavigate();
  const [class_id, setClassId] = useState('');
  const [start_time, setStartTime] = useState('');
  const [close_time, setCloseTime] = useState('');
  const [day, setDay] = useState('');
  const [subject, setSubject] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    if (start_time && close_time && day) {
      fetchAvailableTeachers();
    }
  }, [start_time, close_time, day]);

  const fetchAvailableTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/available_teachers', {
        params: { start_time, close_time, day },
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      setTeachers(response.data);
    } catch (error) {
      setAlertMessage('Failed to fetch available teachers.');
      setAlertType('danger');
      setTimeout(() => {
        setAlertMessage('');
        setAlertType('');
      }, 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage('');
    setAlertType('');

    try {
      await axios.post('http://localhost:5000/create_classroom', {
        class_id,
        start_time,
        close_time,
        day,
        teacher_id_assigned: selectedTeacher,
        subject,
      },{
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });

      setAlertMessage('Classroom created successfully.');
      setAlertType('success');
      setTimeout(() => navigate('/create-class'), 1000);
    } catch (error) {
      setAlertMessage(error.response?.data?.message || 'Failed to create classroom.');
      setAlertType('danger');
      setTimeout(() => {
        setAlertMessage('');
        setAlertType('');
      }, 3000);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <main className="form-signin w-75">
        <h2 className="text-center mb-4">Create Classroom</h2>
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="class_id" className="form-label">Class ID</label>
            <input
              type="text"
              className="form-control"
              id="class_id"
              value={class_id}
              onChange={(e) => setClassId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="start_time" className="form-label">Start Time</label>
            <input
              type="time"
              className="form-control"
              id="start_time"
              value={start_time}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="close_time" className="form-label">Close Time</label>
            <input
              type="time"
              className="form-control"
              id="close_time"
              value={close_time}
              onChange={(e) => setCloseTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="day" className="form-label">Day</label>
            <select
              id="day"
              className="form-select"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            >
              <option value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="teacher_id_assigned" className="form-label">Available Teachers</label>
            <select
              id="teacher_id_assigned"
              className="form-select"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              required
            >
              <option value="">Select a teacher</option>
              {teachers.map(teacher => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-around">
            <button type="button" className="btn btn-secondary" onClick={handleGoBack}>
              Go Back
            </button>
            <button type="submit" className="btn btn-dark">
              Create Classroom
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateClassroom;

import React, { useEffect, useState } from 'react';
import { getTeacherById } from './teacherService'; 

const TeacherBody = ({ teacherId }) => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const teacherData = await getTeacherById(teacherId);
        setTeacher(teacherData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div>
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold" style={{ color: 'black' }}>Welcome, {teacher?.Name}</h1>
            <p className="col-md-8 fs-4">
            Manage your classes, students, and schedule with ease.
            </p>
            <a className="btn btn-dark btn-lg" type="button" href={`/create_timetable?teacherId=${teacherId}`}>
              Create timetable
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherBody;

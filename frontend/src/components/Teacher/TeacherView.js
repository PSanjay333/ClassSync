import React, { useEffect, useState } from "react";
import TeacherHeader from "./TeacherHeader";
import TeacherBody from "./TeacherBody";
import MyStudentsList from "./MyStudentsList";
import TeacherClasses from "./TeacherClasses";
import TeacherTimetable from "./TeacherTimetable";
import { getTeacherById } from "./teacherService";

const TeacherView = () => {
  const [teacherId, setTeacherId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedTeacherId = localStorage.getItem("teacherId");
    if (storedTeacherId) {
      setTeacherId(storedTeacherId);
      fetchTeacherDetails(storedTeacherId);
    } else {
      setError("No teacher ID found in local storage");
    }
  }, []);

  const fetchTeacherDetails = async (id) => {
    try {
      const response = await getTeacherById(id);
      console.log("Teacher details:", response);
    } catch (error) {
      setError("Failed to fetch teacher details");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!teacherId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TeacherHeader />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <TeacherBody teacherId={teacherId} />
            <MyStudentsList teacherId={teacherId} />
            <TeacherClasses teacherId={teacherId} />
            <TeacherTimetable teacherId={teacherId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherView;

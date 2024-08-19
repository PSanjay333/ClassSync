import React from "react";
import StudentHeader from "./StudentHeader";
import StudentBody from "./StudentBody";
import { useLocation } from "react-router-dom";

const StudentView = () => {
  const location = useLocation();
  const studentId = location.state?.id; // Extract studentId using the 'id' key
  console.log(studentId);

  return (
    <div>
      <div>
        <StudentHeader />
      </div>
      <div>
        <div className="">
          {studentId ? (
            <StudentBody studentId={studentId} />
          ) : (
            <p>No student ID provided</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentView;

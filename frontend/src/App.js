import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
import Homepage from './components/Homepage';
import Logins from './components/Logins';
import PrincipalLogin from './components/Login/PrincipalLogin';
import TeacherLogin from './components/Login/TeacherLogin'
import StudentLogin from './components/Login/StudentLogin';
import TeacherSignup from './components/Login/TeacherSignup';
import StudentSignup from './components/Login/StudentSignup';
import PrincipalView from './components/Principal/PrincipalView';
import TeacherView from './components/Teacher/TeacherView';
import StudentView from './components/Student/StudentView';
import Teachers from './components/Teacher/Teachers';
import Students from './components/Student/Students';
import UpdateStudent from './components/Student/UpdateStudent';
import UpdateTeacher from './components/Teacher/UpdateTeachers';
import CreateClassroom from './components/CreateClassroom';
import MyStudentList from './components/Teacher/MyStudentsList';
import AssignStudents from './components/Principal/AssignStudents';
import CreateTimetable from './components/Teacher/CreateTimetable';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} /> 
        <Route path="/logins" element={<Logins/>} /> 
        <Route path="/principal_login" element={<PrincipalLogin/>} /> 
        <Route path="/teacher_login" element={<TeacherLogin/>} />
        <Route path="/student_login" element={<StudentLogin/>} />
        <Route path="/teacher_signup" element={<TeacherSignup/>} />
        <Route path="/student_signup" element={<StudentSignup/>} />
        <Route path="/Principal_Dashboard" element={<PrincipalView/>} />
        <Route path="/Teacher_Dashboard" element={<TeacherView/>} />
        <Route path="/Student_Dashboard" element={<StudentView/>} />
        <Route path="/teachers_list" element={<Teachers/>} />
        <Route path="/students_list" element={<Students/>} />
        <Route path="/update-student" element={<UpdateStudent/>} />
        <Route path="/update-teacher" element={<UpdateTeacher/>} />
        <Route path="/create-class" element={<CreateClassroom/>} />
        <Route path="/my_students_list" element={<MyStudentList/>} />
        <Route path="/assign_students" element={<AssignStudents/>} />
        <Route path="/create_timetable" element={<CreateTimetable/>} />
      </Routes>
    </Router>
  );
}

export default App;

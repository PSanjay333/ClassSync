const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");
const jwt = require("jsonwebtoken");
const teachers = require("./models/Teachers");
const students = require("./models/students");
const classroom = require("./models/classroom");
const Assigned_students_to_teachers = require("./models/Assigned_students_Teachers");
const Timetable = require("./models/Timetable");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const middleware = require("./api/middleware");
const saltRounds = 10;
const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());
mongoDB(); 

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/principal_login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "principal@classroom.com" && password === "Admin") {
      let payload = { role: "principal" };
      jwt.sign(payload, "jwtPassword", { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        return res
          .status(200)
          .json({ token, message: "Principal Login Successful" });
      });
    } else {
      return res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.post("/teacher_login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await teachers.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ message: "User Not Exist, Please SignUp" });
    }

    const passwordMatch = await bcrypt.compare(password, teacher.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    let payload = { teacher: { id: teacher._id } };
    jwt.sign(payload, "jwtPassword", { expiresIn: "1d" }, (err, token) => {
      if (err) throw err;
      return res.json({
        token,
        teacherId: teacher._id,
        message: "Teacher Login Successful",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.post("/student_login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await students.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "User Not Exist, Please SignUp" });
    }
    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    let payload = { student: { id: student._id } };
    jwt.sign(payload, "jwtPassword", { expiresIn: "1d" }, (err, token) => {
      if (err) throw err;
      return res
        .status(200)
        .json({ id: student._id, token, message: "Student login successful" });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.post("/principal_teacher_signup", async (req, res) => {
  try {
    const { name, teacherId, email, password, confirmpassword, department, subject } = req.body;

    
    const existingTeacherByEmail = await teachers.findOne({ email });
    if (existingTeacherByEmail) {
      return res.status(400).send("Teacher Already Registered with this Email");
    }

   
    const existingTeacherById = await teachers.findOne({ teacherId });
    if (existingTeacherById) {
      return res.status(400).send("Teacher ID Already Exists");
    }

    
    if (password !== confirmpassword) {
      return res.status(400).send("Passwords do not match");
    }

    
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    
    const new_teacher = new teachers({
      Name: name,
      teacherId,
      email,
      password: hashedPassword,
      dept: department,
      subject,
    });

   
    await new_teacher.save();

  
    return res.json({ message: "Teacher sign-up successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

app.post("/student_signup", async (req, res) => {
  try {
    const { Name, rollno, email, password, confirmpassword } = req.body;

    
    const existingStudentByEmail = await students.findOne({ email });
    if (existingStudentByEmail) {
      return res.status(400).send("Student Already Registered with this Email");
    }

    
    const existingStudentByRollNo = await students.findOne({ rollno });
    if (existingStudentByRollNo) {
      return res.status(400).send("Roll Number Already Exists");
    }

   
    if (password !== confirmpassword) {
      return res.status(400).send("Passwords do not match");
    }

    
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const new_student = new students({
      Name,
      rollno,
      email,
      password: hashedPassword,
    });

   
    await new_student.save();

 
    return res.json({ message: "Student sign-up successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});


app.post("/create_classroom", middleware, async (req, res) => {
  try {
    const {
      class_id,
      start_time,
      close_time,
      day,
      teacher_id_assigned,
      subject,
    } = req.body;

    if (!start_time || !close_time || !day || !teacher_id_assigned) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const teacherId = new mongoose.Types.ObjectId(teacher_id_assigned);

    
    const teacherExists = await teachers.findById(teacherId);
    if (!teacherExists) {
      return res.status(400).json({ message: "Teacher does not exist" });
    }

    
    const existingAssignment = await classroom.findOne({
      teacher_id_assigned: teacherId,
    });

    if (existingAssignment) {
      return res.status(400).json({
        message: "Teacher is already assigned to a classroom.",
      });
    }

    
    const conflictingClass = await classroom.findOne({
      teacher_id_assigned: teacherId,
      day,
      $or: [
        {
          $and: [
            { start_time: { $lt: close_time } },
            { close_time: { $gt: start_time } },
          ],
        },
      ],
    });

    if (conflictingClass) {
      return res.status(400).json({
        message: "Teacher already assigned to a class during this time slot on this day.",
      });
    }

    const new_class = new classroom({
      class_id,
      start_time,
      close_time,
      day,
      teacher_id_assigned: teacherId,
      subject,
    });

    await new_class.save();
    return res.status(200).json({ message: "Class created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/assign_students_to_teachers", middleware, async (req, res) => {
  try {
    let { teacher_id, student_ids } = req.body;

    if (!Array.isArray(student_ids)) {
      return res.status(400).json({ message: "Invalid student_ids format. It should be an array." });
    }

    const teacher = await teachers.findById(teacher_id);
    if (!teacher) {
      return res.status(400).json({ message: "Teacher does not exist." });
    }

    const studentsList = await students.find({ _id: { $in: student_ids } });
    if (studentsList.length !== student_ids.length) {
      return res.status(400).json({ message: "One or more students do not exist." });
    }

    const existingAssignment = await Assigned_students_to_teachers.findOne({ teacher_id });

    if (existingAssignment) {
     
      if (student_ids.length === 0) {
        await Assigned_students_to_teachers.deleteOne({ teacher_id });
        return res.json({ message: "No valid students to assign. Teacher removed from assignments." });
      }

      
      await Assigned_students_to_teachers.updateOne(
        { teacher_id },
        { $set: { students_ids: student_ids } }
      );
      return res.json({ message: "Teacher already assigned. Updated students list." });
    } else {
     
      const newAssignment = new Assigned_students_to_teachers({
        teacher_id,
        students_ids: student_ids,
      });
      await newAssignment.save();
      return res.json({ message: "Students assigned to teacher successfully." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});



app.post("/create_timetable", middleware, async (req, res) => {
  try {
    const { teacher_id,classroom_id, subject, start_time, end_time, day } = req.body;
    const teacherObjectId = new mongoose.Types.ObjectId(teacher_id);
    const class_id = classroom_id;
    const classroomDetails = await classroom.findOne({ class_id });

    console.log("Print class details:",classroomDetails)
    
    if (!classroomDetails) {
      return res.status(400).send("Classroom does not exist.");
    }

    if (
      start_time < classroomDetails.start_time ||
      end_time > classroomDetails.close_time
    ) {
      return res
        .status(400)
        .send("Timetable period is outside classroom hours.");
    }

    const existingTimetable = await Timetable.findOne({
      classroom_id,
      day,
      $or: [
        {
          $and: [
            { start_time: { $lt: end_time } },
            { end_time: { $gt: start_time } },
          ],
        },
      ],
    });
    if (existingTimetable) {
      return res
        .status(400)
        .send("Timetable period overlaps with an existing period.");
    }

    let new_timetable = new Timetable({
      teacher_id:teacherObjectId,
      classroom_id,
      subject,
      start_time,
      end_time,
      day,
    });

    await new_timetable.save();
    return res.status(200).json({ message: "Timetable created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.get("/students", middleware, async (req, res) => {
  try {
    const allStudents = await students.find({});
    return res.json(allStudents);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.get("/student/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;

    
    const student = await students.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.json(student);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});


app.get("/teachers", middleware, async (req, res) => {
  try {
    const allTeachers = await teachers.find({});
    return res.json(allTeachers);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.get("/teacher/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;

   
    const teacher = await teachers.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    return res.json(teacher);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});


app.put("/update_student/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDetails = req.body;
    const updatedStudent = await students.findByIdAndUpdate(
      id,
      updatedDetails,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).send("Student not found");
    }
    return res.json(updatedStudent);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.put("/update_teacher/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, email, password, confirmpassword, dept } = req.body;

 
    const updateFields = { Name, email, dept }; 
    if (password && confirmpassword) {
      if (password !== confirmpassword) {
        return res.status(400).send("Passwords do not match");
      }
      updateFields.password = await bcrypt.hash(password, saltRounds);
    }

    const updatedTeacher = await teachers.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (!updatedTeacher) {
      return res.status(404).send("Teacher not found");
    }
    return res.json(updatedTeacher);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

app.delete("/delete_student/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await students.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).send("Student not found");
    }
    return res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.delete("/delete_teacher/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await teachers.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).send("Teacher not found");
    }
    return res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.get("/available_teachers", middleware, async (req, res) => {
  try {
    const { start_time, close_time, day } = req.query;

    if (!start_time || !close_time || !day) {
      return res
        .status(400)
        .json({ message: "start_time, close_time, and day are required" });
    }

    const assignedTeachers = await classroom
      .find({
        day,
        $or: [
          {
            $and: [
              { start_time: { $lt: close_time } },
              { close_time: { $gt: start_time } },
            ],
          },
        ],
      })
      .distinct("teacher_id_assigned");

    const availableTeachers = await teachers.find({
      _id: { $nin: assignedTeachers },
    });

    return res.json(availableTeachers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/teacher_students/:teacherId", middleware, async (req, res) => {
  try {
    const { teacherId } = req.params;
    // console.log("Teacher ID:", teacherId);

    
    const assignment = await Assigned_students_to_teachers.findOne({
      teacher_id: teacherId,
    });
    // console.log("Assignment:", assignment);

    if (!assignment) {
      return res
        .status(404)
        .json({ message: "No students assigned to this teacher" });
    }

   
    const studentIds = assignment.students_ids.map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    // console.log("Student IDs:", studentIds);

    
    const studentsList = await students.find({ _id: { $in: studentIds } });
    // console.log("Students List:", studentsList);

    return res.json(studentsList);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.get("/teacher_classes/:teacherId", middleware, async (req, res) => {
  try {
    const { teacherId } = req.params;

    
    const classes = await classroom.find({ teacher_id_assigned: teacherId });
    
    
    return res.json(classes);
  } catch (err) {
    console.error("Error fetching teacher classes:", err); 
    return res.status(500).json({ message: "Server error", error: err.message }); 
  }
});


app.get("/student_details/:studentId", middleware, async (req, res) => {
    try {
      const { studentId } = req.params;
    //   console.log("Received studentId:", studentId);
  
      const assignments = await Assigned_students_to_teachers.find({
        students_ids: studentId,
      });
  
      if (assignments.length === 0) {
        return res.status(404).json({ message: "Assignments not found" });
      }
  
     
      const teachersData = [];
      const fellowStudentsSet = new Set();
  
      
      for (const assignment of assignments) {
        const _id = new mongoose.Types.ObjectId(assignment.teacher_id);
  
       
        const teacher = await teachers.findById(_id);
        if (teacher) {
          teachersData.push(teacher);
        }
  
       
        const fellowStudentIds = assignment.students_ids.filter(
          (id) => id.toString() !== studentId
        );
        fellowStudentIds.forEach((id) => fellowStudentsSet.add(id.toString()));
      }
  
    
      const fellowStudents = await students.find({
        _id: { $in: Array.from(fellowStudentsSet) },
      });
  
    
      return res.json({ teachers: teachersData, fellowStudents });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server error");
    }
  });

  app.get("/teacher_timetable/:teacherId", middleware, async (req, res) => {
    try {
      const { teacherId } = req.params
      console.log("teacherid:",teacherId)
      
      const timetable = await Timetable.find({ teacher_id: teacherId });

      console.log("timetable:",timetable)
  
      if (timetable.length === 0) {
        return res.status(404).json({ message: "No timetable found for this teacher" });
      }
  
      return res.json(timetable);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server error");
    }
  });
  
  
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

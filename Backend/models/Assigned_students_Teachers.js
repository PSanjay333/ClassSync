const mongoose = require("mongoose");

const assigned_students_to_teachersSchema = new mongoose.Schema({
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers',
        required: true
    },
    students_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true
    }]
});

module.exports = mongoose.model("Assigned_students_to_teachers", assigned_students_to_teachersSchema);

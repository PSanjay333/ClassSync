const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
    class_id:{
        type:String,
        required:true
    },
    start_time: {
        type: String,
        required: true,
    },
    close_time: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    teacher_id_assigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teachers',
    },
    subject:{
        type:String,
    }
});

module.exports = mongoose.model("classroom", classroomSchema);

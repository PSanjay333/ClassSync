const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher',
        required:true
    },
    classroom_id: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Timetable", timetableSchema);

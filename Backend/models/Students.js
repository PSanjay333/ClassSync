const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    // confirmpassword: {
    //     type: String,
    //     required: true,
    // },
});

module.exports = mongoose.model("students", studentsSchema);

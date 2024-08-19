const mongoose = require("mongoose");

const teachersSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    // confirmpassword: {
    //     type: String,
    //     required: true
    // },
    dept: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('teachers', teachersSchema);

const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGO_URL; 


async function mongoDB() {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = mongoDB;

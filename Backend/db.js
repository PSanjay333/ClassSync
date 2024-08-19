const mongoose = require('mongoose')
const mongoURL = 'mongodb+srv://sanjaypothurajuwork:UbUMtcFSWJZ98lrh@cluster0.cjqxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
async function mongoDB() {
    try {
      await mongoose.connect(mongoURL);
      console.log('Connected to MongoDB');
      
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  }
  
  module.exports = mongoDB;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: '../.env' }); // Adjust path if this file is moved deeper
}
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(process.env.MONGODB_URL);
  return mongoose.connection;
};

module.exports = connectDB;

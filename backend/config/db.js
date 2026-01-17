// database.config.js
import dotenv from 'dotenv';
dotenv.config();
import { connect } from 'mongoose';
// import mongo_URI from '../.env';

const connectDB = async () => {
  try {
    await connect(process.env.mongo_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
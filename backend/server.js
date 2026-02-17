import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";
import shareRoutes from "./routes/share.js";
import authMiddleware from "./middleware/auth.js"; // Renamed for clarity
import mongoose from "mongoose";

const app = express();

// Database connection
connectDB(); // Assuming this function connects to Mongoose
// A more robust way:
mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err));

// the below line is used to take the json content from teh http headers and helps in making the json content valid and accessible
// app.use(cors());
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// API routes
app.use("/api/users", authRoutes); // registration and login public
app.use("/api/notes", authMiddleware, noteRoutes); // notes protected
app.use("/api/share", shareRoutes); // public share links

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

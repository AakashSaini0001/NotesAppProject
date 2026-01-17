import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// Create Note
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.create({
      title,
      content,
      createdBy: req.user._id,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching notes" });
  }
});

export default router;

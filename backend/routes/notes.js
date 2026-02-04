import express from "express";
import crypto from "crypto";
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

// Get a single note
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching note" });
  }
});

// Generate a share link
router.post("/:id/share", async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    if (!note.shareId) {
      note.shareId = crypto.randomUUID();
      await note.save();
    }

    res.json({ shareId: note.shareId });
  } catch (err) {
    res.status(500).json({ msg: "Error creating share link" });
  }
});

export default router;

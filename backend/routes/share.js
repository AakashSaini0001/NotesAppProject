import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

router.get("/:shareId", async (req, res) => {
  try {
    const note = await Note.findOne({ shareId: req.params.shareId }).select(
      "title content createdAt updatedAt"
    );

    if (!note) {
      return res.status(404).json({ msg: "Shared note not found" });
    }

    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching shared note" });
  }
});

export default router;

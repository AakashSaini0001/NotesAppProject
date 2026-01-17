import Note, { find, findOneAndUpdate, findOneAndDelete } from "../models/Note";

export async function createNote(req, res) {
  const { title, content } = req.body;
  try {
    const newNote = new Note({ title, content, user: req.user.id });
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch {
    res.status(500).send("Server error");
  }
}

export async function getNotes(req, res) {
  try {
    const notes = await find({ user: req.user.id });
    res.json(notes);
  } catch {
    res.status(500).send("Server error");
  }
}

export async function editNote(req, res) {
  const { title, content } = req.body;
  try {
    const updatedNote = await findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content },
      { new: true }
    );
    res.json(updatedNote);
  } catch {
    res.status(500).send("Server error");
  }
}

export async function deleteNote(req, res) {
  try {
    await findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ msg: "Note deleted" });
  } catch {
    res.status(500).send("Server error");
  }
}

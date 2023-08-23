const Note = require("../model/notesModel");
const asyncHandler = require("express-async-handler");
// const { create } = require("../model/notesModel");

const createNote = asyncHandler(async (req, res) => {
  const { title, text, category, Bgcolor } = req.body;

  if (!title || !text || !category) {
    res.status(400).json({ message: "please add all the fields" });
  } else {
    const note = new Note({
      user: req.user._id,
      title,
      text,
      category,
      Bgcolor,
    });
    const newNote = await note.save();
    res.status(201).json(newNote);
  }
});
const updateNote = asyncHandler(async (req, res) => {
  //   const { title, text, category } = req.body;
  const note = await Note.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401).json({ message: "you cant perform this action" });
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedNote);
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400).json({ message: "note not found" });
  }
  //check for user
  if (!req.user) {
    res.status(401).json({ message: "user not found" });
  }
  //make sure the logged iin user matches the goal user

  if (note.user.toString() !== req.user.id.toString()) {
    res.status(401).json({ message: "user not authorized" });
  }
  await note.remove();
  res.status(200).json({ id: req.params.id });
});
const getNote = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "note not found" });
  }
  res.json(note);
});

module.exports = {
  createNote,
  getNote,
  updateNote,
  deleteNote,
  getNoteById,
};
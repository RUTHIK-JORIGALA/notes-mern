const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createNote,
  getNote,
  updateNote,
  deleteNote,
  getNoteById,
} = require("../controllers/notesController");

router.post("/create", protect, createNote);
router.get("/", protect, getNote);
router.get("/:id", protect, getNoteById);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;
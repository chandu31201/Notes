const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');
const { protect } = require('../middleware/authMiddleware');

// All routes in this file are protected and will require a valid token
router.use(protect);

// @route   GET /api/notes
// @route   POST /api/notes
router.route('/')
  .get(getNotes)
  .post(createNote);

// @route   GET /api/notes/:id
// @route   PUT /api/notes/:id
// @route   DELETE /api/notes/:id
router.route('/:id')
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;

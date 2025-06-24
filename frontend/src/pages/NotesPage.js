import React, { useState, useEffect, useCallback } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../services/api';
import NoteItem from '../components/NoteItem';
import NoteForm from '../components/NoteForm';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null); // null for new note, note object for editing

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes.');
      console.error("Fetch notes error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSaveNote = async (noteData) => {
    setIsLoading(true);
    setError('');
    try {
      if (noteToEdit) { // Editing existing note
        const updatedNote = await updateNote(noteToEdit._id, noteData);
        setNotes(notes.map(n => n._id === noteToEdit._id ? updatedNote.data : n));
      } else { // Creating new note
        const newNote = await createNote(noteData);
        setNotes([newNote.data, ...notes]); // Add to the beginning of the list
      }
      setShowForm(false);
      setNoteToEdit(null);
    } catch (err) {
      setError(err.response?.data?.message || (noteToEdit ? 'Failed to update note.' : 'Failed to create note.'));
      console.error("Save note error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setShowForm(true);
    window.scrollTo(0, 0); // Scroll to top to see the form
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsLoading(true); // Can be a more specific loading state if needed
      setError('');
      try {
        await deleteNote(noteId);
        setNotes(notes.filter(n => n._id !== noteId));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete note.');
        console.error("Delete note error:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setNoteToEdit(null);
    setError(''); // Clear any form-specific errors
  };

  const handleAddNewNoteClick = () => {
    setNoteToEdit(null); // Ensure it's a new note form
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>My Notes</h2>
        {!showForm && (
          <button
            onClick={handleAddNewNoteClick}
            style={{ padding: '0.75rem 1.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            + Add New Note
          </button>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showForm && (
        <NoteForm
          noteToEdit={noteToEdit}
          onSave={handleSaveNote}
          onCancel={handleCancelForm}
          isLoading={isLoading}
        />
      )}

      {isLoading && !notes.length && <p>Loading notes...</p>}

      {!isLoading && !notes.length && !showForm && (
        <p>You don't have any notes yet. Click "Add New Note" to create one!</p>
      )}

      <div>
        {notes.map(note => (
          <NoteItem
            key={note._id}
            note={note}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesPage;









// The NotesPage component manages and displays the user's notes.
// Uses React hooks (useState, useEffect, useCallback) for state and side effects.
// Fetches notes from the backend API on component mount using fetchNotes.
// Maintains state for notes list, loading status, error messages, form visibility, and the note being edited.
// Displays a button to add a new note; clicking it shows the note form.
// Shows the NoteForm component for creating or editing a note.
// Handles saving a note (create or update) and updates the notes list accordingly.
// Handles editing by setting the selected note in state and showing the form.
// Handles deleting a note with confirmation and updates the notes list.
// Handles canceling the form, hiding it and clearing errors.
// Displays loading and error messages as needed.
// Renders a list of NoteItem components for each note, passing edit and delete handlers.
// Uses inline styles for layout and button appearance.
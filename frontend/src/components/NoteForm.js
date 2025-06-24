import React, { useState, useEffect } from 'react';

const NoteForm = ({ noteToEdit, onSave, onCancel, isLoading }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title || '');
      setContent(noteToEdit.content || '');
    } else {
      // Reset form for new note
      setTitle('');
      setContent('');
    }
    setError(''); // Clear error when noteToEdit changes or form is reset
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }
    onSave({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem', backgroundColor: '#fff' }}>
      <h3 style={{marginTop: 0}}>{noteToEdit ? 'Edit Note' : 'Create New Note'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="5"
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', boxSizing: 'border-box', resize: 'vertical' }}
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            style={{ marginRight: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cancel
        </button>
        <button
            type="submit"
            disabled={isLoading}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {isLoading ? (noteToEdit ? 'Saving...' : 'Creating...') : (noteToEdit ? 'Save Changes' : 'Create Note')}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;





// The NoteForm component is a reusable form for creating or editing notes.
// It uses React hooks (useState, useEffect) to manage form state and side effects.
// Props:
// noteToEdit: If provided, the form is in edit mode and pre-fills with note data.
// onSave: Callback function called when the form is submitted with valid data.
// onCancel: Callback function called when the Cancel button is clicked.
// isLoading: Boolean to indicate if a save operation is in progress (disables buttons and shows loading text).
// The form has two fields: Title and Content, both required.
// If either field is empty on submit, an error message is shown.
// The form displays "Edit Note" or "Create New Note" as the heading based on mode.
// The Cancel button calls onCancel and is disabled when loading.
// The Submit button calls onSave with the note data and is disabled when loading.
// The button text changes to "Saving..." or "Creating..." when loading, depending on the mode.
// Inline styles are used for layout and button appearance.
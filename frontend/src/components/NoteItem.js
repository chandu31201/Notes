import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
  if (!note) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      console.error("Failed to format date:", dateString, e);
      return 'Invalid Date';
    }
  };

  return (
    <div style={{ border: '1px solid #eee', padding: '1rem', marginBottom: '1rem', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{note.title}</h3>
      <p style={{ whiteSpace: 'pre-wrap', marginBottom: '0.5rem' }}>{note.content}</p>
      <small style={{ color: '#555', display: 'block', marginBottom: '1rem' }}>
        Last updated: {formatDate(note.updatedAt)}
      </small>
      <div>
        <button
          onClick={() => onEdit(note)}
          style={{ marginRight: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;




// The NoteItem component displays a single note's details.
// It receives note, onEdit, and onDelete as props.
// If the note prop is missing, the component returns null (renders nothing).
// The formatDate function safely formats the note's updatedAt date for display.
// The note's title and content are shown, with content preserving line breaks.
// The last updated date is displayed in a readable format.
// There are two buttons:
// Edit: Calls onEdit with the current note when clicked.
// Delete: Calls onDelete with the note's _id when clicked.
// Inline styles are used for layout and button appearance.
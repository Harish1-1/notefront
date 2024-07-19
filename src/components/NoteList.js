import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoteList = ({ token }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, [token]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('https://noteback-m01l.onrender.com/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Failed to fetch notes', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`https://noteback-m01l.onrender.com/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (error) {
      console.error('Failed to delete note', error);
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note._id} style={{ backgroundColor: note.color }}>
            <div className="note-header">
              <h2>{note.title}</h2>
              <div className="note-tags">{note.tags.join(', ')}</div>
              <button onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
            <p>{note.content}</p>
            {note.reminder && <p>Reminder: {new Date(note.reminder).toLocaleString()}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;

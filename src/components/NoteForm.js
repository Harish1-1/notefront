import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = ({ token, fetchNotes }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [reminder, setReminder] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://noteback-m01l.onrender.com/notes', { title, content, tags: tags.split(',').map(tag => tag.trim()), reminder, color: selectedColor }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle('');
      setContent('');
      setTags('');
      setReminder('');
      fetchNotes();
    } catch (error) {
      console.error('Failed to create note', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Note</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
      <input type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} />
      <div>
        <button type="button" className="color-btn" data-color="#ffffff" onClick={() => setSelectedColor('#ffffff')}>White</button>
        <button type="button" className="color-btn" data-color="#ff0000" onClick={() => setSelectedColor('#ff0000')}>Red</button>
        <button type="button" className="color-btn" data-color="#00ff00" onClick={() => setSelectedColor('#00ff00')}>Green</button>
        <button type="button" className="color-btn" data-color="#0000ff" onClick={() => setSelectedColor('#0000ff')}>Blue</button>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default NoteForm;

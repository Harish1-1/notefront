import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import './styles.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {token ? (
            <>
              <Link to="/notes">Notes</Link>
              <Link to="/create">Create Note</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/login" element={<Login setToken={(token) => { setToken(token); localStorage.setItem('token', token); }} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={token ? <NoteList token={token} /> : <Navigate to="/login" />} />
          <Route path="/create" element={token ? <NoteForm token={token} fetchNotes={() => {}} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={token ? "/notes" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

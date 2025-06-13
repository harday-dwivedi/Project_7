// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">NotesApp</Link>
      <div className="ms-auto">
        <Link className="btn btn-outline-light me-2" to="/register">Register</Link>
        <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
        <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;


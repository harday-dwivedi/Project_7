// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
  <Route path="/" element={
    <PrivateRoute><Dashboard /></PrivateRoute>
  } />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
</Routes>

    </Router>
  );
}

export default App;

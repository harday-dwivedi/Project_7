// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input
            className="form-control"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={onSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input className="form-control" name="name" placeholder="Name" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <input className="form-control" name="email" placeholder="Email" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <input className="form-control" type="password" name="password" placeholder="Password" onChange={onChange} required />
        </div>
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;

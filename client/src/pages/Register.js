import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../App.css'; 

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2 style={{ marginBottom: '15px' }}>📝 Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit">Register</button>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
}

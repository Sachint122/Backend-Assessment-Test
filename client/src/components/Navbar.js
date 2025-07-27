
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  

  const logout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

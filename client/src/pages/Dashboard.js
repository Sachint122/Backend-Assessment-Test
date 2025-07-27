import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function Dashboard() {
  const [user, setUser] = useState({ name: '' });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('/auth/profile');
        setUser(userRes.data);

        const statsRes = await axios.get('/dashboard/user');
        setStats(statsRes.data);
      } catch (err) {
        console.error('❌ Dashboard fetch error:', err.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name || 'User'}! 👋</h2>

      <div className="stats-box">
        <div className="stat-item">
          <strong>Total</strong>
          <p>{stats.total}</p>
        </div>
        <div className="stat-item">
          <strong>Pending</strong>
          <p>{stats.pending}</p>
        </div>
        <div className="stat-item">
          <strong>In Progress</strong>
          <p>{stats.inProgress}</p>
        </div>
        <div className="stat-item">
          <strong>Completed</strong>
          <p>{stats.completed}</p>
        </div>
      </div>
    </div>
  );
}

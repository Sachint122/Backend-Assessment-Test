import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../Admin.css';
import TaskCard from '../components/TaskCard';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({
        totalTasks: 0,
        pending: 0,
        inProgress: 0,
        completed: 0
    });

    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/admin/users');
            setUsers(res.data);
        } catch (err) {
            alert('Error fetching users');
        }
    };

    const fetchStats = async () => {
        try {
            const res = await axios.get('/dashboard/manager');
            setStats(res.data);
        } catch (err) {
            alert('Failed to load stats');
        }
    };

    const fetchTasks = async (userId) => {
        try {
            const res = await axios.get(`/admin/users/${userId}/tasks`);
            setTasks(res.data);
            setSelectedUserId(userId);
        } catch (err) {
            alert('Error fetching tasks');
        }
    };

    const handleDelete = async (taskId) => {
        if (!window.confirm('Delete this task?')) return;
        try {
            await axios.delete(`/tasks/${taskId}`);
            fetchTasks(selectedUserId);
        } catch (err) {
            alert('Failed to delete task');
        }
    };

    const handleEdit = async (taskId, updatedTask) => {
        try {
            await axios.put(`/tasks/${taskId}`, updatedTask);
            fetchTasks(selectedUserId);
        } catch (err) {
            alert('Failed to update task');
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchStats();
    }, [selectedUserId,users,tasks,stats]);

    return (
        <div
            style={{
                maxWidth: '95%',
                margin: '50px auto',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
            }}
            className="dashboard"
        >
            <h2>👨‍💼 Admin Panel</h2>
            <button
                style={{
                    background: '#ff7675',
                    color: 'white',
                    marginLeft: '20px'
                }}
                onClick={logout}
            >
                Logout
            </button>
            <div className="stats-box" style={{
                display: 'flex',
                gap: '30px',
                margin: '20px 0',
                padding: '15px',
                borderRadius: '8px',
                color: 'white'
            }}>
                <div>📦 Total: <strong>{stats.totalTasks}</strong></div>
                <div>⏳ Pending: <strong>{stats.pending}</strong></div>
                <div>🔄 In Progress: <strong>{stats.inProgress}</strong></div>
                <div>✅ Completed: <strong>{stats.completed}</strong></div>
            </div>

            <div className="admin-panel">
                <div className="user-list">
                    <h3>👥 All Users</h3>
                    <div className="user-scroll">
                        {users.map((user) => (
                            <button
                                key={user.id}
                                className={`user-btn ${selectedUserId === user.id ? 'active' : ''}`}
                                onClick={() => fetchTasks(user.id)}
                            >
                                {user.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="task-list" style={{ width: '80%' }}>
                    <h3>User's Tasks</h3>
                    {selectedUserId && (
                        <>
                            {tasks.length === 0 ? (
                                <p>No tasks found.</p>
                            ) : (
                                <div className="task-grid">
                                    {tasks.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onDelete={handleDelete}
                                            showActions={true}
                                            onEdit={handleEdit}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
